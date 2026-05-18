#!/bin/bash

CRITICALITY=1
TITLE="Ensure auditd is installed"

function check {
    STATUS="Fail"

    if dpkg-query -l auditd audispd-plugins > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: auditd audispd-plugins is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
	apt install -y auditd audispd-plugins
}
