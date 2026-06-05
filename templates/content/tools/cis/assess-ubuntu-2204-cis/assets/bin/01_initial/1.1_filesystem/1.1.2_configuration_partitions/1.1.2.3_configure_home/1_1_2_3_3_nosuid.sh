#!/bin/bash

CRITICALITY=1
TITLE="Ensure nosuid option set on /home partition"

function check {
    MOUNTPOINT="/home"
    STATUS="Fail"

    if findmnt -n "$MOUNTPOINT" > /dev/null 2>&1; then
        OPTIONS="$(findmnt -n -o OPTIONS "$MOUNTPOINT" 2>/dev/null)"
        if echo ",$OPTIONS," | grep -F ",nosuid," > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: nosuid option is not set on /home"
        fi
    else
        STATUS="Fail: /home is not a separate partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires planned storage changes for /home.'
}
