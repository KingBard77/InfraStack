#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd IgnoreRhosts is enabled"

function check {
    STATUS="Fail"

    if grep -E "^IgnoreRhosts yes" /etc/ssh/sshd_config; then
        echo "Pass"
    else
        echo "Failed: IgnoreRhosts is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*IgnoreRhosts\s*/d' /etc/ssh/sshd_config

    echo "IgnoreRhosts yes" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
