#!/bin/bash

CRITICALITY=1
TITLE="Ensure journald is configured to send logs to rsyslog"
function check {
    STATUS="Fail"

    if grep -RE '^\s*ForwardToSyslog\s*=\s*yes\b' /etc/systemd/journald.conf /etc/systemd/journald.conf.d/*.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: journald ForwardToSyslog is not set to yes"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")
    sed -i '/^\s*ForwardToSyslog\s*=/d' /etc/systemd/journald.conf
    echo 'ForwardToSyslog=yes' | tee -a /etc/systemd/journald.conf > /dev/null
    systemctl restart systemd-journald
}
