#!/bin/bash

CRITICALITY=1
TITLE='Ensure ufw outbound connections are configured'

function check {
    STATUS="Pass"

    if ! command -v ufw > /dev/null 2>&1; then
        STATUS="Fail: ufw is not installed"
    elif ! ufw status verbose 2>/dev/null | grep -Eiq '^Default:.*allow \(outgoing\)'; then
        STATUS="Fail: ufw outbound default policy is not configured to allow"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v ufw > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y ufw
    fi

    ufw default allow outgoing
}
