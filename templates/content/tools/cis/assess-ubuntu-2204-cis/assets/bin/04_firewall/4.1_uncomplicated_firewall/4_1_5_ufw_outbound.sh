#!/bin/bash

CRITICALITY=2
TITLE="Ensure ufw outbound connections are configured"

function check {
    STATUS="Fail"

    if ufw status numbered | grep "ALLOW OUT" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: UFW outbound connections are not configured correctly"
    fi

    echo "Check status: $STATUS"
}
function fix {
    ufw allow out on all
}
