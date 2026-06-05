#!/bin/bash

CRITICALITY=2
TITLE="Ensure auditd service is enabled and active"

function check {
    STATUS="Fail"

    if systemctl is-enabled auditd | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active auditd | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: auditd is not enabled"
        fi
    else
        STATUS="Fail: auditd is not enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl --now enable auditd
}
