#!/bin/bash

CRITICALITY=1
TITLE="Ensure journald ForwardToSyslog is disabled"
function check {
    STATUS="Fail"

    if grep -RE '^\s*ForwardToSyslog\s*=\s*no\b' /etc/systemd/journald.conf /etc/systemd/journald.conf.d/*.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: journald ForwardToSyslog is not set to no"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")
    sed -i '/^\s*ForwardToSyslog\s*=/d' /etc/systemd/journald.conf
    echo 'ForwardToSyslog=no' | tee -a /etc/systemd/journald.conf > /dev/null
    systemctl restart systemd-journald
}
