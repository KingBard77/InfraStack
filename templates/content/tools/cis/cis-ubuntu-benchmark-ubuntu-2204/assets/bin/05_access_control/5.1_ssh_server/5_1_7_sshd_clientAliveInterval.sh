#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd ClientAliveInterval and ClientAliveCountMax are configured"

CLIENT_ALIVE_INTERVAL=15
CLIENT_ALIVE_COUNT_MAX=3

function check {
    STATUS="Fail"

    if grep -E "^ClientAliveInterval ${CLIENT_ALIVE_INTERVAL}" /etc/ssh/sshd_config; then
        echo "Pass"
    else
        STATUS="Fail"
    fi

    if grep -E "^ClientAliveCountMax ${CLIENT_ALIVE_COUNT_MAX}" /etc/ssh/sshd_config; then
        echo "Pass"
    else
        STATUS="Fail"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*ClientAliveInterval\s*/d' /etc/ssh/sshd_config
    sed -i '/^\s*ClientAliveCountMax\s*/d' /etc/ssh/sshd_config

    echo "ClientAliveInterval ${CLIENT_ALIVE_INTERVAL}" | tee -a /etc/ssh/sshd_config > /dev/null
    echo "ClientAliveCountMax ${CLIENT_ALIVE_COUNT_MAX}" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}