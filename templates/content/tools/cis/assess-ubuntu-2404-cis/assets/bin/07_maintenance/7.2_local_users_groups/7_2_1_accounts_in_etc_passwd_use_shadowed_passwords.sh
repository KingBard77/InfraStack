#!/bin/bash

CRITICALITY=1
TITLE="Ensure accounts in /etc/passwd use shadowed passwords"

function check {
    STATUS="Pass"

    if awk -F: '($2 != "x" ) { print "User: \"" $1 "\" is not set to shadowed passwords "}' /etc/passwd > /dev/null 2>&1; then
        STATUS="Fail"
    else
        echo "Check status: $STATUS"
    fi
}

function fix {
    pwconv
}
