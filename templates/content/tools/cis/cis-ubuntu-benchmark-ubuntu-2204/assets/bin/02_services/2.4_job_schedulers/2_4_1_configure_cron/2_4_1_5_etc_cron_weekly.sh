#!/bin/bash

CRITICALITY=1
TITLE="Ensure permissions on /etc/cron.weekly are configured"

function check {
    STATUS="Fail"

    FILE_INFO=$(stat -Lc '%a %u %g' /etc/cron.weekly)

    PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
    OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
    GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

    if [[ ("$PERMISSIONS" == "700" || "$PERMISSIONS" == "600") && "$OWNER" == "0" && "$GROUP" == "0" ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: /etc/cron.weekly permissions or ownership are incorrect"
    fi

    echo "Check status: $STATUS"
}

function fix {
    chown root:root /etc/cron.weekly
    chmod og-rwx /etc/cron.weekly
}
