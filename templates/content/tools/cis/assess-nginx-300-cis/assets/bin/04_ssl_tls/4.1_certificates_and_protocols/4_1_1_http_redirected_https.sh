#!/bin/bash

CRITICALITY=1
TITLE='Ensure HTTP is redirected to HTTPS'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq 'return[[:space:]]+(301|308)[[:space:]]+https://'; then
        STATUS="Fail: HTTP to HTTPS redirect was not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
