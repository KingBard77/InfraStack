#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd LogLevel is configured"

function check {
    STATUS="Fail"

    if grep -E "^LogLevel INFO" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: LogLevel is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*LogLevel\s*/d' /etc/ssh/sshd_config

    echo "LogLevel INFO" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
