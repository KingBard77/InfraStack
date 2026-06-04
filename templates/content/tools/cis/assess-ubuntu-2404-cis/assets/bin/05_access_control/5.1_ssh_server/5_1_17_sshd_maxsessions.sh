#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd MaxSessions is configured"

function check {
    STATUS="Fail"

    if grep -E "^MaxSessions 10" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: MaxSessions are not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*MaxSessions\s*/d' /etc/ssh/sshd_config

    echo "MaxSessions 10" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
