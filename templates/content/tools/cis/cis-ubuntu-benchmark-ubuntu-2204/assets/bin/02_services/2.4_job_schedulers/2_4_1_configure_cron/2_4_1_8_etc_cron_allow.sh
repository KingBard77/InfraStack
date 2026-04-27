#!/bin/bash

CRITICALITY=1
TITLE="Ensure permissions on /etc/cron.allow and /etc/cron.deny are configured"

function check {
    STATUS="Pass"

    if [ -e "/etc/cron.allow" ]; then
        FILE_INFO=$(stat -Lc '%a %u %g' /etc/cron.allow)
        PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
        OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
        GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

        if [[ "$PERMISSIONS" != "640" || "$OWNER" != "0" || "$GROUP" != "0" ]]; then
            STATUS="Fail: /etc/cron.allow permissions or ownership are incorrect"
        fi
    else
        STATUS="Fail: /etc/cron.allow does not exist"
    fi

    if [ -e "/etc/cron.deny" ]; then
        FILE_INFO=$(stat -Lc '%a %u %g' /etc/cron.deny)
        PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
        OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
        GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

        if [[ "$PERMISSIONS" != "640" || "$OWNER" != "0" || "$GROUP" != "0" ]]; then
            STATUS="Fail: /etc/cron.deny permissions or ownership are incorrect"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ ! -e "/etc/cron.allow" ]; then
        touch /etc/cron.allow
    fi

    chown root:root /etc/cron.allow
    chmod 640 /etc/cron.allow

    if [ -e "/etc/cron.deny" ]; then
        chown root:root /etc/cron.deny
        chmod 640 /etc/cron.deny
    fi
}