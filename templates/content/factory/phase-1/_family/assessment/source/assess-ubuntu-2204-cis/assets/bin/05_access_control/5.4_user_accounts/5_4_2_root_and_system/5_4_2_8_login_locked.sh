#!/bin/bash

CRITICALITY=1
TITLE="Ensure accounts without a valid login shell are locked"
function check {
    STATUS="Pass"

    awk -F: '($7 ~ /(nologin|false)$/) { print $1 }' /etc/passwd | while read -r USER; do
        if passwd -S "$USER" 2>/dev/null | awk '$2 !~ /^(L|LK)$/ { exit 0 } { exit 1 }'; then
            echo "$USER"
        fi
    done | grep -q . && STATUS="Fail: accounts without valid login shells are not locked"

    echo "Check status: $STATUS"
}

function fix {
    awk -F: '($7 ~ /(nologin|false)$/) { print $1 }' /etc/passwd | while read -r USER; do
        passwd -S "$USER" 2>/dev/null | awk '$2 !~ /^(L|LK)$/ { exit 0 } { exit 1 }' && usermod -L "$USER"
    done
}
