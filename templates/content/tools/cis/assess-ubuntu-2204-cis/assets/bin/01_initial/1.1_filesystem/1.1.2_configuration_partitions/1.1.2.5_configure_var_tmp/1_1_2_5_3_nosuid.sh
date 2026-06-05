#!/bin/bash

CRITICALITY=1
TITLE="Ensure nosuid option set on /var/tmp partition"

function check {
    MOUNTPOINT="/var/tmp"
    STATUS="Fail"

    if findmnt -n "$MOUNTPOINT" > /dev/null 2>&1; then
        OPTIONS="$(findmnt -n -o OPTIONS "$MOUNTPOINT" 2>/dev/null)"
        if echo ",$OPTIONS," | grep -F ",nosuid," > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: nosuid option is not set on /var/tmp"
        fi
    else
        STATUS="Fail: /var/tmp is not a separate partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires planned storage changes for /var/tmp.'
}
