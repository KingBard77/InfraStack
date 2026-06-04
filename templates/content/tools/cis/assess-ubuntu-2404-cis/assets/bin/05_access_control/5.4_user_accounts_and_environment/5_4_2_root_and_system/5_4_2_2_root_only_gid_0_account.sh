#!/bin/bash

CRITICALITY=1
TITLE="Ensure root is the only GID 0 account"

function check {
    STATUS="Fail"

    if awk -F: '($1 !~ /^(sync|shutdown|halt|operator)/ && $4=="0") {print $1":"$4}' /etc/passwd > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: root is not GID 0"
    fi

    echo "Check status: $STATUS"
}

function fix {
    usermod -g 0 root
    groupmod -g 0 root

    GID0_ACCOUNTS=$(awk -F: '($4 == 0 && $1 != "root") { print $1 }' /etc/passwd)

    for account in $GID0_ACCOUNTS; do
        echo "Changing GID of $account from 0 to 1000"
        usermod -g 1000 $account
    done
}
