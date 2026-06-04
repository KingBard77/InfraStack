#!/bin/bash

CRITICALITY=1
TITLE='Ensure package manager repositories are configured'

function check {
    STATUS="Pass"

    if ! apt-cache policy > /dev/null 2>&1; then
        STATUS="Fail: apt package repositories cannot be read"
    elif grep -R 'trusted=yes' /etc/apt/sources.list /etc/apt/sources.list.d 2>/dev/null | grep -q .; then
        STATUS="Fail: apt repository uses trusted=yes"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation is intentionally disabled; review the failed resources and apply approved changes.'
}
