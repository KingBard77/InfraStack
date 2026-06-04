#!/bin/bash

CRITICALITY=1
TITLE="Ensure permissions on /etc/gshadow- are configured"

function check {
    STATUS="Fail"

    if stat -c '%U' /etc/gshadow | grep -E "root" > /dev/null 2>&1; then
        if stat -c '%G' /etc/gshadow | grep -E "root" > /dev/null 2>&1; then
            if stat -c '%a' /etc/gshadow | grep -E "644" > /dev/null 2>&1; then
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
    chmod 644 /etc/gshadow
    chown root:root /etc/gshadow
}
