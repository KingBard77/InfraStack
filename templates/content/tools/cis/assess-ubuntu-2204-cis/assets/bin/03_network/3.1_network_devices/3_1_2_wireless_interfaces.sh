#!/bin/bash

CRITICALITY=1
TITLE="Ensure wireless interfaces are not available"
function check {
    STATUS="Fail"

    if ! find /sys/class/net -mindepth 1 -maxdepth 2 -type d -name wireless -print -quit 2>/dev/null | grep -q .; then
        STATUS="Pass"
    elif command -v nmcli > /dev/null 2>&1 && nmcli radio wifi 2>/dev/null | grep -Eiq 'disabled|off'; then
        STATUS="Pass"
    else
        STATUS="Fail: wireless interfaces are available"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if command -v nmcli > /dev/null 2>&1; then
        nmcli radio wifi off
    else
        echo 'nmcli is not installed; disable wireless interfaces using the host network manager'
    fi
}
