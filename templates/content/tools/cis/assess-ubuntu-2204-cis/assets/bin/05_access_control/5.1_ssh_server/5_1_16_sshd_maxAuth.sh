#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd MaxAuthTries is configured"

function check {
    STATUS="Fail"

    if grep -E "^MaxAuthTries 4" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: MaxAuthTries are not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*MaxAuthTries\s*/d' /etc/ssh/sshd_config

    echo "MaxAuthTries 4" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}