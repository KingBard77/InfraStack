#!/bin/bash

CRITICALITY=1
TITLE="Ensure sudo log file exists"

function check {
    STATUS="Fail"

    if grep -Ei '^\s*Defaults\s+logfile=.*' /etc/sudoers > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: sudo log is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    LOG_FILE="/var/log/sudo.log"

    cp -a /etc/sudoers /etc/sudoers.$(date +"%s")

    sed -i '/^\s*Defaults\s\+logfile=.*$/d' /etc/sudoers

    echo "Defaults logfile=\"$LOG_FILE\"" | tee -a /etc/sudoers > /dev/null

    if [ ! -f "$LOG_FILE" ]; then
        touch "$LOG_FILE"
        chown root:root "$LOG_FILE"
        chmod 600 "$LOG_FILE"
    fi
}
