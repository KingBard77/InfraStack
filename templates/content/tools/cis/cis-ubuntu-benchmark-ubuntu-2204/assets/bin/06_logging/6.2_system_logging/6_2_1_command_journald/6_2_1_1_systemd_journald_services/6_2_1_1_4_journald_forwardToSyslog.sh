#!/bin/sh

CRITICALITY=1
TITLE="Ensure journald log file rotation is configured"

ForwardToSyslog="no"

function check {
    STATUS="Fail"

    if grep -E "^ForwardToSyslog=${ForwardToSyslog}" /etc/systemd/journald.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: ForwardToSyslog is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")

    sed -i '/^\s*ForwardToSyslog\s*/d' /etc/systemd/journald.conf 

    echo "ForwardToSyslog=${ForwardToSyslog}" | tee -a /etc/systemd/journald.conf > /dev/null

    systemctl restart systemd-journald
}