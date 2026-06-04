#!/bin/bash

CRITICALITY=2
TITLE="Ensure separate partition exists for /home"

function check {
    MOUNTPOINT="/home"
    STATUS="Fail"

    if findmnt -n "$MOUNTPOINT" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: /home is not a separate partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires planned storage changes for /home.'
}
