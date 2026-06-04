#!/bin/bash

CRITICALITY=1
TITLE='Ensure private key permissions are restricted'

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

    KEYS="$(printf '%s\n' "$NGINX_CONFIG" | awk 'tolower($1) == "ssl_certificate_key" { gsub(";", "", $2); print $2 }' | sort -u)"

    if [[ -z "$KEYS" ]]; then
        STATUS="Fail: no ssl_certificate_key directives found"
    else
        for KEY in $KEYS; do
            if [[ ! -f "$KEY" ]]; then
                STATUS="Fail: private key file is missing: $KEY"
                break
            fi
            MODE="$(stat -c '%a' "$KEY" 2>/dev/null)"
            if [[ -z "$MODE" ]] || (( 8#$MODE & 077 )); then
                STATUS="Fail: private key permissions are too open: $KEY"
                break
            fi
        done
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v nginx > /dev/null 2>&1; then
        echo "nginx is not installed"
        return 1
    fi

    KEYS="$(nginx -T 2>/dev/null | awk 'tolower($1) == "ssl_certificate_key" { gsub(";", "", $2); print $2 }' | sort -u)"

    if [[ -z "$KEYS" ]]; then
        echo "No ssl_certificate_key directives found"
        return 1
    fi

    for KEY in $KEYS; do
        if [[ -f "$KEY" ]]; then
            chown root:root "$KEY"
            chmod 600 "$KEY"
        else
            echo "Private key file is missing: $KEY"
        fi
    done
}
