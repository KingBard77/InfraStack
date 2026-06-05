#!/bin/bash

CRITICALITY=1
TITLE="Ensure XDCMP is not enabled"

function check {
    STATUS="Pass"

    if grep -Riq '^[[:space:]]*Enable[[:space:]]*=[[:space:]]*true' /etc/gdm3/custom.conf /etc/gdm/custom.conf 2>/dev/null; then
        STATUS="Fail: XDMCP is enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    CONFIG="/etc/gdm3/custom.conf"
    mkdir -p "$(dirname "$CONFIG")"
    touch "$CONFIG"
    cp -a "$CONFIG" "$CONFIG.$(date +%s).bak"
    sed -i -E '/^[[:space:]]*Enable[[:space:]]*=/d' "$CONFIG"
    {
        printf '%s\n' '[xdmcp]'
        printf '%s\n' 'Enable=false'
    } >> "$CONFIG"
}
