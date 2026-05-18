#!/bin/sh

CRITICALITY=1
TITLE="Ensure journald Compress is configured"

Compress="yes"

function check {
    STATUS="Fail"

    if grep -E "^Compress=${Compress}" /etc/systemd/journald.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: Compress is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")

    sed -i '/^\s*Compress\s*/d' /etc/systemd/journald.conf 

    echo "Compress=${Compress}" | tee -a /etc/systemd/journald.conf > /dev/null

    systemctl restart systemd-journald
}