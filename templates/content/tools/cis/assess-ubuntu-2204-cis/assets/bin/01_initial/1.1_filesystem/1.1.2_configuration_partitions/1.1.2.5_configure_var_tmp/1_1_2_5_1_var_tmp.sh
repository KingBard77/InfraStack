#!/bin/sh

CRITICALITY=1
TITLE="Ensure /var/tmp is a separate partition or mounted with other fstype"

function check {
    STATUS="Fail"

    if mount | grep -E "/var/tmp" > /dev/null; then
        STATUS="Pass"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
