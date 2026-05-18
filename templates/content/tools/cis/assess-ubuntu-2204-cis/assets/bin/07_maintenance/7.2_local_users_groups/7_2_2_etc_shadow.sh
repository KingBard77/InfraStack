#!/bin/sh

CRITICALITY=1
TITLE="Ensure /etc/shadow password fields are not empty"

function check {
    STATUS="Pass"

    if awk -F: '($2 == "" ) { print $1 " does not have a password "}' /etc/shadow > /dev/null 2>&1; then
        STATUS="Fail"
    else
        echo "Check status: $STATUS"
    fi
}

function fix {
	echo "Manual"
	echo "Command: passwd -l <username>"
}
