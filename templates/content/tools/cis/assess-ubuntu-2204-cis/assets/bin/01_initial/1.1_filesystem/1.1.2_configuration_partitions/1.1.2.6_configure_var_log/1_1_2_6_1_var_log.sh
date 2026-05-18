#!/bin/sh

CRITICALITY=1
TITLE="Ensure /var/log is a separate partition or mounted with other fstype"

function check {
    STATUS="Fail"

    if mount | grep -E "/var/log" > /dev/null; then
        STATUS="Pass"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
