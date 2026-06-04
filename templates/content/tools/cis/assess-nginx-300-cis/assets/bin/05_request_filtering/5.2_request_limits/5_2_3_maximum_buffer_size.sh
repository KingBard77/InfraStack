#!/bin/bash

CRITICALITY=1
TITLE='Ensure the maximum buffer size for URIs is defined'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq '^[[:space:]]*large_client_header_buffers[[:space:]]+'; then
        STATUS="Fail: large_client_header_buffers is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
