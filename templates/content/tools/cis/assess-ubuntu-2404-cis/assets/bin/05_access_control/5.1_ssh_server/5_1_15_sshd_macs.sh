#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd MACs are configured"

function check {
    DESIRED_MACS="hmac-sha2-256,hmac-sha2-512,hmac-sha1"
    STATUS="Fail"

    if grep -E "^MACs ${DESIRED_MACS}" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: MACs are not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    DESIRED_MACS="hmac-sha2-256,hmac-sha2-512,hmac-sha1"
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*MACs\s*/d' /etc/ssh/sshd_config

    echo "MACs ${DESIRED_MACS}" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
