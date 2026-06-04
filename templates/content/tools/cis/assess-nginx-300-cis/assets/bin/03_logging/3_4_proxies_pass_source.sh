#!/bin/bash

CRITICALITY=1
TITLE='Ensure proxies pass source IP information'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq 'proxy_set_header[[:space:]]+X-Forwarded-For[[:space:]]+\$proxy_add_x_forwarded_for' || ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq 'proxy_set_header[[:space:]]+X-Real-IP[[:space:]]+\$remote_addr'; then
        STATUS="Fail: proxy source IP headers are not configured"
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

    nginx_ensure_conf_d_include() {
        MAIN_CONF="${CIS_NGINX_MAIN_CONF:-/etc/nginx/nginx.conf}"
        if [[ ! -f "$MAIN_CONF" ]]; then
            return 0
        fi
        if grep -Eq 'include[[:space:]]+/etc/nginx/conf\.d/\*\.conf;' "$MAIN_CONF"; then
            return 0
        fi

        nginx_backup_file "$MAIN_CONF"
        TMP_FILE="$(mktemp)"
        awk 'BEGIN { done=0 } /^[[:space:]]*http[[:space:]]*\{/ && done == 0 { print; print "    include /etc/nginx/conf.d/*.conf;"; done=1; next } { print } END { if (done == 0) exit 1 }' "$MAIN_CONF" > "$TMP_FILE" || {
            rm -f "$TMP_FILE"
            echo "Unable to insert conf.d include into $MAIN_CONF"
            return 1
        }
        cat "$TMP_FILE" > "$MAIN_CONF"
        rm -f "$TMP_FILE"
    }

    nginx_apply_hardening_block() {
        DELETE_PATTERN="$1"
        BLOCK="$2"
        HARDENING_FILE="${CIS_NGINX_HARDENING_FILE:-/etc/nginx/conf.d/99-cis-hardening.conf}"

        mkdir -p "$(dirname "$HARDENING_FILE")"
        touch "$HARDENING_FILE"
        nginx_backup_file "$HARDENING_FILE"
        nginx_ensure_conf_d_include || return 1
        sed -i -E "/$DELETE_PATTERN/d" "$HARDENING_FILE"
        printf '%s\n' "$BLOCK" >> "$HARDENING_FILE"
        nginx_test_or_fail
    }

    printf -v CIS_BLOCK '%s\n' 'proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;' 'proxy_set_header X-Real-IP $remote_addr;'

    nginx_apply_hardening_block '^[[:space:]]*proxy_set_header[[:space:]]+(X-Forwarded-For|X-Real-IP)[[:space:]]+' "$CIS_BLOCK"
}
