#!/bin/bash

CRITICALITY=2
TITLE="Ensure sshd DisableForwarding is enabled"

function check {
    STATUS="Fail"

    if grep -E "^DisableForwarding yes" /etc/ssh/sshd_config > /dev/null 2>&1; then
        echo "Pass"
    else
        STATUS="Fail"
        echo "Failed: DisableForwarding is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*DisableForwarding\s*/d' /etc/ssh/sshd_config

    echo "DisableForwarding yes" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
