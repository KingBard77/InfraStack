#!/bin/bash

CRITICALITY=1
TITLE='Ensure the latest software package is installed'

function check {
    STATUS="Pass"

    if command -v dpkg-query > /dev/null 2>&1 && dpkg-query -W nginx > /dev/null 2>&1; then
        if apt list --upgradable 2>/dev/null | grep -Eq '^nginx(/|-)'; then
            STATUS="Fail: nginx package update is available"
        fi
    elif command -v rpm > /dev/null 2>&1 && rpm -q nginx > /dev/null 2>&1; then
        if command -v dnf > /dev/null 2>&1; then
            dnf -q check-update nginx > /dev/null 2>&1
            RESULT="$?"
            [[ "$RESULT" -eq 100 ]] && STATUS="Fail: nginx package update is available"
        elif command -v yum > /dev/null 2>&1; then
            yum -q check-update nginx > /dev/null 2>&1
            RESULT="$?"
            [[ "$RESULT" -eq 100 ]] && STATUS="Fail: nginx package update is available"
        fi
    else
        STATUS="Fail: nginx package is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if command -v apt-get > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y --only-upgrade nginx
    elif command -v dnf > /dev/null 2>&1; then
        dnf update -y nginx
    elif command -v yum > /dev/null 2>&1; then
        yum update -y nginx
    else
        echo "No supported package manager found for nginx update"
        return 1
    fi
}
