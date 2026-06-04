#!/bin/bash

CRITICALITY=2
TITLE="Ensure auditd packages are installed"
function check {
    STATUS="Fail"

    if dpkg-query -W auditd audispd-plugins > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: required packages are not installed: auditd audispd-plugins"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install -y auditd audispd-plugins
}
