#!/bin/sh

CRITICALITY=1
TITLE="Ensure /var/log/audit is a separate partition or mounted with other fstype"

function check {
    STATUS="Fail"

    if mount | grep -E "/var/log/audit" > /dev/null; then
        STATUS="Pass"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
