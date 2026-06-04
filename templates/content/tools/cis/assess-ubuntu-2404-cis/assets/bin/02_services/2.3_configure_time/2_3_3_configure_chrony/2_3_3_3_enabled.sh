#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is enabled and running"
function check {
    STATUS="Fail"

    if systemctl is-enabled chrony > /dev/null 2>&1 && systemctl is-active chrony > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: chrony is not enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl enable --now chrony
}
