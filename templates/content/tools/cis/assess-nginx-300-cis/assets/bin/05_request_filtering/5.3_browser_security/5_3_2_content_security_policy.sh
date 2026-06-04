#!/bin/bash

CRITICALITY=2
TITLE='Ensure that Content Security Policy (CSP) is enabled and configured properly'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq 'add_header[[:space:]]+Content-Security-Policy'; then
        STATUS="Fail: Content-Security-Policy header is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
