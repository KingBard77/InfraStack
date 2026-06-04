#!/bin/bash

CRITICALITY=2
TITLE='Ensure allow and deny filters limit access to specific IP addresses'

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

    if ! printf '%s\n' "$NGINX_CONFIG" | grep -Eiq '^[[:space:]]*(allow|deny)[[:space:]]+'; then
        STATUS="Fail: allow/deny access filters were not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
