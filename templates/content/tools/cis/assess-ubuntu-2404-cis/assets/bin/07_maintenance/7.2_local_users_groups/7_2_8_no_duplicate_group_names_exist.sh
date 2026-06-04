#!/bin/bash

CRITICALITY=1
TITLE="Ensure no duplicate group names exist"

function check {
    STATUS="Pass"

    DUPLICATE_GROUPS=$(cut -f1 -d":" /etc/group | sort | uniq -d)
    if [ -n "$DUPLICATE_GROUPS" ]; then
        STATUS="Fail"
        for group in $DUPLICATE_GROUPS; do
            echo "Duplicate Group: \"$group\""
        done
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual."
}
