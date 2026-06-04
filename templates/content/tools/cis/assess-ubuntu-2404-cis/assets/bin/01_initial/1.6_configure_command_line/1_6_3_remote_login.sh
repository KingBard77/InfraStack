#!/bin/bash

CRITICALITY=1
TITLE="Ensure remote login warning banner is configured properly"

function check {
    STATUS="Fail"
    OS_NAME=$(grep '^ID=' /etc/os-release | cut -d= -f2 | tr -d '"')

    if [ ! -f /etc/issue.net ]; then
        STATUS="Fail: /etc/issue.net does not exist"
    elif grep -Eiq "\\\\[vrsm]|${OS_NAME}" /etc/issue.net; then
        STATUS="Fail: /etc/issue.net contains system information"
    elif grep -Eq '[^[:space:]]' /etc/issue.net; then
        STATUS="Pass"
    else
        STATUS="Fail: /etc/issue.net is empty"
    fi

    echo "Check status: $STATUS"
}

function fix {
    printf '%s\n' 'Authorized users only. All activity may be monitored and reported.' > /etc/issue.net
}
