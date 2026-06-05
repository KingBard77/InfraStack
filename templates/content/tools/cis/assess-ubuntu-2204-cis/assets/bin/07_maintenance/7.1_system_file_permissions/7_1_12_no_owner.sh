#!/bin/bash

CRITICALITY=1
TITLE="Ensure no files or directories without an owner and a group exist"
function check {
    STATUS="Pass"

    if find / -xdev \( -nouser -o -nogroup \) -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: files or directories without owner or group exist"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires assigning an approved owner and group.'
}
