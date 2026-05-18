#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd LoginGraceTime is configured"

LoginGraceTime="60"

function check {
    STATUS="Fail"

    if grep -E "^LoginGraceTime ${LoginGraceTime}" /etc/ssh/sshd_config > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: LoginGraceTime is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*LoginGraceTime\s*/d' /etc/ssh/sshd_config

    echo "LoginGraceTime ${LoginGraceTime}" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
