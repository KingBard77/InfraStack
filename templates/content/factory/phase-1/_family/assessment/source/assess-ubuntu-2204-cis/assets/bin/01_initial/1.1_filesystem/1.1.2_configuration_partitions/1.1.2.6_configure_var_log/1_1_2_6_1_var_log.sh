#!/bin/bash

CRITICALITY=2
TITLE="Ensure separate partition exists for /var/log"

function check {
    MOUNTPOINT="/var/log"
    STATUS="Fail"

    if findmnt -n "$MOUNTPOINT" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: /var/log is not a separate partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires planned storage changes for /var/log.'
}
