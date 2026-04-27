#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd HostbasedAuthentication is disabled"

function check {
    STATUS="Fail"

    if grep -E "^HostbasedAuthentication no" /etc/ssh/sshd_config; then
        echo "Pass"
    else
        echo "Failed: HostbasedAuthentication is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*HostbasedAuthentication\s*/d' /etc/ssh/sshd_config

    echo "HostbasedAuthentication no" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}