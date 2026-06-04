#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsyslog service is enabled and active"
function check {
    STATUS="Fail"

    if systemctl is-enabled rsyslog > /dev/null 2>&1 && systemctl is-active rsyslog > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: rsyslog is not enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl enable --now rsyslog
}
