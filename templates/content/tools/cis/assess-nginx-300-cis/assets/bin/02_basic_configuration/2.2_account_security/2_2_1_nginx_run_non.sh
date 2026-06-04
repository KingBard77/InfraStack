#!/bin/bash

CRITICALITY=1
TITLE='Ensure that NGINX is run using a non-privileged, dedicated service account'

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

    if [[ "$NGINX_USER" == "root" ]]; then
        STATUS="Fail: nginx worker user is root"
    elif ! id "$NGINX_USER" > /dev/null 2>&1; then
        STATUS="Fail: nginx service user does not exist: $NGINX_USER"
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
    MAIN_CONF="${CIS_NGINX_MAIN_CONF:-/etc/nginx/nginx.conf}"

    if [[ ! -f "$MAIN_CONF" ]]; then
        echo "Missing nginx main configuration: $MAIN_CONF"
        return 1
    fi

    nginx_backup_file "$MAIN_CONF"

    if grep -Eq '^[[:space:]]*user[[:space:]]+' "$MAIN_CONF"; then
        sed -i -E "s|^[[:space:]]*user[[:space:]]+[^;]+;|user $NGINX_USER;|" "$MAIN_CONF"
    else
        TMP_FILE="$(mktemp)"
        awk -v user="$NGINX_USER" 'BEGIN { done=0 } /^[[:space:]]*http[[:space:]]*\{/ && done == 0 { print "user " user ";"; print; done=1; next } { print } END { if (done == 0) print "user " user ";" }' "$MAIN_CONF" > "$TMP_FILE"
        cat "$TMP_FILE" > "$MAIN_CONF"
        rm -f "$TMP_FILE"
    fi

    nginx_test_or_fail
}
