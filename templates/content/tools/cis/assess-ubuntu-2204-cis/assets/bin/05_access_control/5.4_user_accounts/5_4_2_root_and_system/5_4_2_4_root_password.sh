#!/bin/sh

CRITICALITY=1
TITLE="Ensure group root is the only GID 0 group"

function check {
    STATUS="Fail"

    if passwd -S root | awk '$2 ~ /^P/ {print "User: \"" $1 "\" Password is set"}' > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: passwd root is not set"
    fi

    echo "Check status: $STATUS"
}

function fix {
	echo "Manual"
	echo "command: passwd root"
}
