#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd PermitRootLogin is disabled"

function check {
    STATUS="Fail"

    if grep -E "^PermitRootLogin no" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: PermitRootLogin is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*PermitRootLogin\s*/d' /etc/ssh/sshd_config

    echo "PermitRootLogin no" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
