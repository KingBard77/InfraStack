#!/bin/bash

CRITICALITY=1
TITLE="Ensure permissions on /etc/cron.hourly are configured"

function check {
    STATUS="Fail"

    FILE_INFO=$(stat -Lc '%a %u %g' /etc/cron.hourly)

    PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
    OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
    GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

    if [[ ("$PERMISSIONS" == "700" || "$PERMISSIONS" == "600") && "$OWNER" == "0" && "$GROUP" == "0" ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: /etc/cron.hourly permissions or ownership are incorrect"
    fi

    echo "Check status: $STATUS"
}

function fix {
    chown root:root /etc/cron.hourly
    chmod og-rwx /etc/cron.hourly
}
