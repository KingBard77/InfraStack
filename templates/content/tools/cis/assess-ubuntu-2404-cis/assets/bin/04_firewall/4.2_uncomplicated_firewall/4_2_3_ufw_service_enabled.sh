#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw service is enabled"

function check {
    STATUS="Fail"

    if systemctl is-enabled ufw.service | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active ufw.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: ufw service is not active"
        fi
    else
        STATUS="Fail: ufw service is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl unmask ufw.service
    systemctl --now enable ufw.service
    ufw enable
}
