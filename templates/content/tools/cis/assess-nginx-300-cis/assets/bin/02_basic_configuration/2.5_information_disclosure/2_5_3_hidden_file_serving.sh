#!/bin/bash

CRITICALITY=1
TITLE='Ensure hidden file serving is disabled'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eq 'location[[:space:]]+~.*\\\.' || ! printf '%s\n' "$NGINX_CONFIG" | grep -Eq 'deny[[:space:]]+all;'; then
        STATUS="Fail: hidden file deny rule was not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
