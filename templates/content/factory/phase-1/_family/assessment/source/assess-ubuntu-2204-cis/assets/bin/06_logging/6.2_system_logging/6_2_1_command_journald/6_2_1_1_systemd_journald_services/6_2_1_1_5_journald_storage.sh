#!/bin/sh

CRITICALITY=1
TITLE="Ensure journald Storage is configured"

Storage="persistent"

function check {
    STATUS="Fail"

    if grep -E "^Storage=${Storage}" /etc/systemd/journald.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: Storage is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")

    sed -i '/^\s*Storage\s*/d' /etc/systemd/journald.conf 

    echo "Storage=${Storage}" | tee -a /etc/systemd/journald.conf > /dev/null

    systemctl restart systemd-journald
}