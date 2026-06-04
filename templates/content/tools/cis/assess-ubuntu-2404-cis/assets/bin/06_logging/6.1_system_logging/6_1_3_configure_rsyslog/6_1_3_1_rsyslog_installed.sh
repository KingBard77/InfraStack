#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsyslog is installed"
function check {
    STATUS="Fail"

    if dpkg-query -W rsyslog > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: required packages are not installed: rsyslog"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install -y rsyslog
}
