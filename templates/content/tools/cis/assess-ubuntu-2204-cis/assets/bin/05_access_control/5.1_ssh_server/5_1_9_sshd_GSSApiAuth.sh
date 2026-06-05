#!/bin/sh

CRITICALITY=2
TITLE="Ensure sshd GSSAPIAuthentication is disabled"

function check {
    STATUS="Fail"

    if grep -E "^GSSAPIAuthentication no" /etc/ssh/sshd_config; then
        echo "Pass"
    else
        echo "Failed: GSSAPIAuthentication is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*GSSAPIAuthentication\s*/d' /etc/ssh/sshd_config

    echo "GSSAPIAuthentication no" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}

