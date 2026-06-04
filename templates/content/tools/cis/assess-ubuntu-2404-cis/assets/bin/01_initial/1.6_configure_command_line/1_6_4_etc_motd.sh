#!/bin/bash

CRITICALITY=1
TITLE="Ensure access to /etc/motd is configured"

function check {
    STATUS="Fail"

    if stat -c '%U' /etc/motd | grep -E "root" > /dev/null 2>&1; then
        if stat -c '%G' /etc/motd | grep -E "root" > /dev/null 2>&1; then
            if stat -c '%a' /etc/motd | grep -E "644" > /dev/null 2>&1; then
                STATUS="Pass"
            else
                STATUS="Failed: Permissions are not 644"
            fi
        else
            STATUS="Failed: Group is not root"
        fi
    else
        STATUS="Failed: Owner is not root"
    fi

    echo "Check status: $STATUS"
}

function fix {
    chmod 644 /etc/motd
    chown root:root /etc/motd
}
