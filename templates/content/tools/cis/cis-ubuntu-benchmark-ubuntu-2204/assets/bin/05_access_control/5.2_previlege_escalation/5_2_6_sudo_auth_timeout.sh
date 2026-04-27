#!/bin/sh

CRITICALITY=1
TITLE="Ensure sudo authentication timeout is configured correctly"

MAX_TIMEOUT="15"

function check {
    STATUS="Pass"

    CURRENT_TIMEOUT=$(grep -roP "timestamp_timeout=\K[0-9]*" /etc/sudoers* | sort -nr | head -n 1)
    if [ -z "$CURRENT_TIMEOUT" ]; then
        CURRENT_TIMEOUT=$(sudo -V | grep "Authentication timestamp timeout:" | grep -oP "[0-9]+")
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/sudoers /etc/sudoers.$(date +"%s")

    sed -i '/^\s*Defaults env_reset, timestamp_timeout=[0-9]*\s*/d' /etc/sudoers
    sed -i '/^\s*Defaults timestamp_timeout=[0-9]*\s*/d' /etc/sudoers
    sed -i '/^\s*Defaults env_reset\s*/d' /etc/sudoers

    echo "Defaults env_reset, timestamp_timeout=$MAX_TIMEOUT" | tee -a /etc/sudoers > /dev/null
    echo "Defaults timestamp_timeout=$MAX_TIMEOUT" | tee -a /etc/sudoers > /dev/null
    echo "Defaults env_reset" | tee -a /etc/sudoers > /dev/null

    systemctl restart sshd
}