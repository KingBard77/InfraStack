#!/bin/bash

CRITICALITY=1
TITLE="Ensure local login warning banner is configured properly"

function check {
    STATUS="Fail"

    if grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/issue.net > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: Command verify a result"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Authorized users only. All activity may be monitored and reported." | tee /etc/issue.net
}
