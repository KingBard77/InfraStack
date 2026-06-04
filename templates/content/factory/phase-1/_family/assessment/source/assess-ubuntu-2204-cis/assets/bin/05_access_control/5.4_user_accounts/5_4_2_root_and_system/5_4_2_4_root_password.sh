#!/bin/bash

CRITICALITY=1
TITLE="Ensure root account access is controlled"
function check {
    STATUS="Fail"

    if passwd -S root 2>/dev/null | awk '$2 ~ /^(L|LK)$/ { found=1 } END { exit found ? 0 : 1 }'; then
        STATUS="Pass"
    elif awk -F: '$1 == "root" && $2 ~ /^(!|\*)/ { found=1 } END { exit found ? 0 : 1 }' /etc/shadow; then
        STATUS="Pass"
    else
        STATUS="Fail: root account is not locked"
    fi

    echo "Check status: $STATUS"
}

function fix {
    passwd -l root
}
