#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd MaxStartups is configured"

DESIRED_MAX_STARTUPS="10:30:60"

function check {
    STATUS="Fail"

    if grep -E "^MaxStartups ${DESIRED_MAX_STARTUPS}" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: MaxStartups is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*MaxStartups\s*/d' /etc/ssh/sshd_config

    echo "MaxStartups ${DESIRED_MAX_STARTUPS}" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}