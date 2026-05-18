#!/bin/bash

CRITICALITY=1
TITLE="Ensure cron daemon is enabled and active"

function check {
    STATUS="Fail"
    
    if systemctl is-enabled cron.service >/dev/null 2>&1 || systemctl is-enabled crond.service >/dev/null 2>&1; then
        if systemctl is-active cron.service >/dev/null 2>&1 || systemctl is-active crond.service >/dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: cron service is not active"
        fi
    else
        STATUS="Fail: cron service is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl unmask cron.service crond.service
    systemctl --now enable cron.service crond.service
}
