#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd PermitEmptyPasswords is disabled"

function check {
    STATUS="Fail"

    if grep -E "^PermitEmptyPasswords no" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: PermitEmptyPasswords is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*PermitEmptyPasswords\s*/d' /etc/ssh/sshd_config

    echo "PermitEmptyPasswords no" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
