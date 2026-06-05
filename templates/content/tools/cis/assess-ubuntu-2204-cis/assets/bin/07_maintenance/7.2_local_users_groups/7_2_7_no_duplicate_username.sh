#!/bin/sh

CRITICALITY=1
TITLE="Ensure no duplicate user names exist"

function check {
    STATUS="Pass"

    DUPLICATE_USERS=$(cut -f1 -d":" /etc/passwd | sort | uniq -d)
    if [ -n "$DUPLICATE_USERS" ]; then
        STATUS="Fail"
        for user in $DUPLICATE_USERS; do
            echo "Duplicate User: \"$user\""
        done
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: Duplicate username cleanup requires selecting which account to rename.'
}
