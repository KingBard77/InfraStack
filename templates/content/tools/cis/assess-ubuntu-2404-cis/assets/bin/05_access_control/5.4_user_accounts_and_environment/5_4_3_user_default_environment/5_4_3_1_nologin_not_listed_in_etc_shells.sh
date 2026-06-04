#!/bin/bash

CRITICALITY=2
TITLE="Ensure nologin is not listed in /etc/shells"

function check {
    STATUS="Fail"

    if grep -E "^nologin" /etc/shells > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: nologin is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/shells /etc/shells.$(date +"%s")

    sed -i '/^\s*nologin\s*/d' /etc/shells
}
