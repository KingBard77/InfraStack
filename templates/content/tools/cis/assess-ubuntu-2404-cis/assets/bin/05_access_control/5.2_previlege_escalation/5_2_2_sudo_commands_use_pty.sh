#!/bin/bash

CRITICALITY=1
TITLE="Ensure sudo commands use pty"

function check {
    STATUS="Fail"

    if grep -Ei '^\s*Defaults\s+use_pty' /etc/sudoers > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: use_pty is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/sudoers /etc/sudoers.$(date +"%s")

    sed -i '/^\s*Defaults\s\+use_pty\s*$/d' /etc/sudoers

    echo 'Defaults use_pty' | tee -a /etc/sudoers > /dev/null

    systemctl restart sshd
}
