#!/bin/bash

CRITICALITY=1
TITLE="Ensure root is the only UID 0 account"

function check {
    STATUS="Fail"

    if awk -F: '($3 == 0) { print $1 }' /etc/passwd > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: root is not UID 0"
    fi

    echo "Check status: $STATUS"
}

function fix {
    UID0_ACCOUNTS=$(awk -F: '($3 == 0 && $1 != "root") { print $1 }' /etc/passwd)

    for account in $UID0_ACCOUNTS; do
        usermod -u 1000 $account
    done
}
