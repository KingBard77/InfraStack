#!/bin/bash

CRITICALITY=1
TITLE="Ensure system accounts do not have a valid login shell"
function check {
    STATUS="Fail"

    if awk -F: '($3 < 1000 && $1 != "root" && $7 !~ /(nologin|false)$/) { print $1 }' /etc/passwd | grep -q .; then
        STATUS="Fail: system accounts have valid login shells"
    else
        STATUS="Pass"
    fi

    echo "Check status: $STATUS"
}

function fix {
    awk -F: '($3 < 1000 && $1 != "root" && $7 !~ /(nologin|false)$/) { print $1 }' /etc/passwd | while read -r USER; do
        usermod -s /usr/sbin/nologin "$USER"
    done
}
