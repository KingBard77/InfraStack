#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd KexAlgorithms is configured"

function check {
    DESIRED_KEX_ALGORITHMS="curve25519-sha256,curve25519-sha256@libssh.org"
    STATUS="Fail"

    if grep -E "^KexAlgorithms ${DESIRED_KEX_ALGORITHMS}" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: KexAlgorithms is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    DESIRED_KEX_ALGORITHMS="curve25519-sha256,curve25519-sha256@libssh.org"
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*KexAlgorithms\s*/d' /etc/ssh/sshd_config

    echo "KexAlgorithms ${DESIRED_KEX_ALGORITHMS}" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
