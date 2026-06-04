#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd access is configured"

function check {
	STATUS="Fail"

    if grep -E "^Banner /etc/issue.net" /etc/ssh/sshd_config > /dev/null; then
        echo "Pass"
    else
        echo "Failed: Banner parameter is not set or incorrectly set"
    fi
    
    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*Banner\s*/d' /etc/ssh/sshd_config

    echo "Banner /etc/issue.net" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
