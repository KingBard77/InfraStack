#!/bin/bash

CRITICALITY=1
TITLE='Ensure timeout values for reading the client header and body are set correctly'

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

    for DIRECTIVE in client_body_timeout client_header_timeout; do
        VALUE="$(printf '%s\n' "$NGINX_CONFIG" | awk -v directive="$DIRECTIVE" 'tolower($1) == directive { gsub(";", "", $2); print $2; exit }')"
        VALUE="${VALUE%s}"
        if [[ ! "$VALUE" =~ ^[0-9]+$ ]] || [[ "$VALUE" -eq 0 ]] || [[ "$VALUE" -gt 10 ]]; then
            STATUS="Fail: $DIRECTIVE is not set to 1-10 seconds"
            break
        fi
    done

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

    printf -v CIS_BLOCK '%s\n' 'client_body_timeout 10;' 'client_header_timeout 10;'

    nginx_apply_hardening_block '^[[:space:]]*client_(body|header)_timeout[[:space:]]+' "$CIS_BLOCK"
}
