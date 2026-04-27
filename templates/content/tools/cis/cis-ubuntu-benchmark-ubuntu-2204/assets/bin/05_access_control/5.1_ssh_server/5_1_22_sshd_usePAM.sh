#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd UsePAM is configured"

function check {
    STATUS="Fail"

    if grep -E "^UsePAM yes" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: UsePAM is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*UsePAM\s*/d' /etc/ssh/sshd_config

    echo "UsePAM yes" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}