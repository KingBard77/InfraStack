#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd access is configured"
function check {
    STATUS="Fail"

    if sshd -T 2>/dev/null | awk '$1 ~ /^(allowusers|allowgroups|denyusers|denygroups)$/ { found=1 } END { exit found ? 0 : 1 }'; then
        STATUS="Pass"
    else
        STATUS="Fail: sshd access restrictions are not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires site-approved SSH allow or deny lists.'
}
