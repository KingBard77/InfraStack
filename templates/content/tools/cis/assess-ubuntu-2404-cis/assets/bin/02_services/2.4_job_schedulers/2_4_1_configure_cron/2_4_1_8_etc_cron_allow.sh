#!/bin/bash

CRITICALITY=1
TITLE="Ensure crontab is restricted to authorized users"

function check {
    STATUS="Pass"
    FILE_INFO=$(stat -Lc '%a %u %g' /etc/cron.allow 2>/dev/null)

    if [ ! -f /etc/cron.allow ]; then
        STATUS="Fail: /etc/cron.allow does not exist"
    elif [ "$FILE_INFO" != "640 0 0" ] && [ "$FILE_INFO" != "600 0 0" ]; then
        STATUS="Fail: /etc/cron.allow permissions or ownership are incorrect"
    fi

    if [ -e /etc/cron.deny ]; then
        STATUS="Fail: /etc/cron.deny must not exist"
    fi

    echo "Check status: $STATUS"
}

function fix {
    touch /etc/cron.allow
    chown root:root /etc/cron.allow
    chmod 640 /etc/cron.allow
    rm -f /etc/cron.deny
}
