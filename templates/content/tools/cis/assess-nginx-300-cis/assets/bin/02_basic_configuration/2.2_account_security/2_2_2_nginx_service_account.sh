#!/bin/bash

CRITICALITY=1
TITLE='Ensure the NGINX service account is locked'

function check {
    STATUS="Pass"

    if ! command -v nginx > /dev/null 2>&1; then
        STATUS="Fail: nginx is not installed"
        echo "Check status: $STATUS"
        return
    fi

    NGINX_CONFIG="$(nginx -T 2>/dev/null)"
    if [[ -z "$NGINX_CONFIG" ]]; then
        STATUS="Fail: unable to read nginx configuration with nginx -T"
        echo "Check status: $STATUS"
        return
    fi

    NGINX_USER="$(printf '%s\n' "$NGINX_CONFIG" | awk 'tolower($1) == "user" { gsub(";", "", $2); print $2; exit }')"
    if [[ -z "$NGINX_USER" ]]; then
        STATUS="Fail: nginx user directive is not configured"
        echo "Check status: $STATUS"
        return
    fi

    if passwd -S "$NGINX_USER" 2>/dev/null | awk '{print $2}' | grep -Eq '^(L|LK)$'; then
        STATUS="Pass"
    elif awk -F: -v user="$NGINX_USER" '$1 == user && $2 ~ /^!|^\*/ { found=1 } END { exit !found }' /etc/shadow 2>/dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: nginx service account is not locked: $NGINX_USER"
    fi

    echo "Check status: $STATUS"
}

function fix {
    nginx_backup_file() {
        TARGET="$1"
        if [[ -f "$TARGET" ]]; then
            cp -a "$TARGET" "$TARGET.$(date +%s).bak"
        fi
    }

    nginx_reload() {
        if command -v systemctl > /dev/null 2>&1 && systemctl is-active --quiet nginx 2>/dev/null; then
            systemctl reload nginx
        else
            nginx -s reload 2>/dev/null || true
        fi
    }

    nginx_test_or_fail() {
        if nginx -t > /dev/null 2>&1; then
            nginx_reload || true
        else
            echo "nginx configuration test failed after remediation"
            return 1
        fi
    }

    nginx_choose_service_user() {
        if command -v nginx > /dev/null 2>&1; then
            CURRENT_USER="$(nginx -T 2>/dev/null | awk 'tolower($1) == "user" { gsub(";", "", $2); print $2; exit }')"
            if [[ -n "$CURRENT_USER" && "$CURRENT_USER" != "root" ]] && id "$CURRENT_USER" > /dev/null 2>&1; then
                printf '%s\n' "$CURRENT_USER"
                return 0
            fi
        fi

        if id nginx > /dev/null 2>&1; then
            printf 'nginx\n'
        elif id www-data > /dev/null 2>&1; then
            printf 'www-data\n'
        else
            NOLOGIN="/usr/sbin/nologin"
            [[ -x "$NOLOGIN" ]] || NOLOGIN="/sbin/nologin"
            [[ -x "$NOLOGIN" ]] || NOLOGIN="/bin/false"
            useradd --system --no-create-home --shell "$NOLOGIN" nginx
            printf 'nginx\n'
        fi
    }

    NGINX_USER="$(nginx_choose_service_user)"

    if command -v passwd > /dev/null 2>&1; then
        passwd -l "$NGINX_USER"
    elif command -v usermod > /dev/null 2>&1; then
        usermod -L "$NGINX_USER"
    else
        echo "No supported account locking command found"
        return 1
    fi
}
