#!/bin/bash

CRITICALITY=1
TITLE='Ensure journald log file access is configured'

function check {
    STATUS="Pass"

    if find /var/log/journal /run/log/journal -type f -perm /037 -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: journald log files are more permissive than 0640"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for DIR in /var/log/journal /run/log/journal; do
        [[ -d "$DIR" ]] || continue
        find "$DIR" -type d -exec chmod g-w,o-rwx {} +
        find "$DIR" -type f -exec chmod u-x,g-wx,o-rwx {} +
    done
}
