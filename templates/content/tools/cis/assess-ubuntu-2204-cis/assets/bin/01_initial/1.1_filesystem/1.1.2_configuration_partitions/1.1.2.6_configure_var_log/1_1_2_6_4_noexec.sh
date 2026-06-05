#!/bin/bash

CRITICALITY=1
TITLE="Ensure noexec option set on /var/log partition"

function check {
    MOUNTPOINT="/var/log"
    STATUS="Fail"

    if findmnt -n "$MOUNTPOINT" > /dev/null 2>&1; then
        OPTIONS="$(findmnt -n -o OPTIONS "$MOUNTPOINT" 2>/dev/null)"
        if echo ",$OPTIONS," | grep -F ",noexec," > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: noexec option is not set on /var/log"
        fi
    else
        STATUS="Fail: /var/log is not a separate partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires planned storage changes for /var/log.'
}
