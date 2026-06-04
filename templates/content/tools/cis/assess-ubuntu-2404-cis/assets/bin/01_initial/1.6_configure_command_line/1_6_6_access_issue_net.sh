#!/bin/bash

CRITICALITY=1
TITLE="Ensure access to /etc/issue.net is configured"

function check {
    STATUS="Fail"

    if stat -c '%U' /etc/issue.net | grep -E "root" > /dev/null 2>&1; then
        if stat -c '%G' /etc/issue.net | grep -E "root" > /dev/null 2>&1; then
            if stat -c '%a' /etc/issue.net | grep -E "644" > /dev/null 2>&1; then
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
    chown root:root $(readlink -e /etc/issue.net.net)
    chmod u-x,go-wx $(readlink -e /etc/issue.net.net)
}
