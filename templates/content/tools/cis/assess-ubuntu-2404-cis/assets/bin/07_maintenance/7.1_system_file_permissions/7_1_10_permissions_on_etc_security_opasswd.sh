#!/bin/bash

CRITICALITY=1
TITLE="Ensure permissions on /etc/security/opasswd are configured"

function check {
    STATUS="Fail"

    if stat -c '%U' /etc/security/opasswd | grep -E "root" > /dev/null 2>&1; then
        if stat -c '%G' /etc/security/opasswd | grep -E "root" > /dev/null 2>&1; then
            if stat -c '%a' /etc/security/opasswd | grep -E "644" > /dev/null 2>&1; then
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

    if stat -c '%U' /etc/security/opasswd.old | grep -E "root" > /dev/null 2>&1; then
        if stat -c '%G' /etc/security/opasswd.old | grep -E "root" > /dev/null 2>&1; then
            if stat -c '%a' /etc/security/opasswd.old | grep -E "644" > /dev/null 2>&1; then
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
    chmod 644 /etc/security/opasswd
    chown root:root /etc/security/opasswd

    chmod 644 /etc/security/opasswd.old
    chown root:root /etc/security/opasswd.old
}
