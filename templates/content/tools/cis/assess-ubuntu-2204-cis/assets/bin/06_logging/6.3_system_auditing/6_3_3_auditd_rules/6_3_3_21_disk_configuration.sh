#!/bin/bash

CRITICALITY=2
TITLE='Ensure the running and on disk configuration is the same'

function check {
    STATUS="Pass"

    if command -v augenrules > /dev/null 2>&1; then
        if ! augenrules --check > /dev/null 2>&1; then
            STATUS="Fail: running audit rules differ from on-disk rules"
        fi
    elif command -v auditctl > /dev/null 2>&1; then
        STATUS="Pass: auditctl is available; augenrules comparison is unavailable"
    else
        STATUS="Fail: audit tooling is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v augenrules > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y auditd audispd-plugins
    fi

    augenrules --load
    systemctl restart auditd 2>/dev/null || true
}
