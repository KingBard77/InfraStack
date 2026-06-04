#!/bin/bash

CRITICALITY=1
TITLE="Ensure at is restricted to authorized users"

function check {
    STATUS="Pass"

    if [ ! -e "/etc/at.allow" ]; then
        STATUS="Fail: /etc/at.allow does not exist"
    else
        FILE_INFO=$(stat -Lc '%a %u %g' /etc/at.allow)

        PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
        OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
        GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

        if [[ "$PERMISSIONS" -le 640 && "$OWNER" == "0" && ( "$GROUP" == "0" || "$GROUP" == "$(getent group daemon | cut -d: -f3)" ) ]]; then
            STATUS="Pass"
        else
            STATUS="Fail: /etc/at.allow permissions or ownership are incorrect."
        fi
    fi

    if [ -e "/etc/at.deny" ]; then
        FILE_INFO=$(stat -Lc '%a %u %g' /etc/at.deny)

        PERMISSIONS=$(echo "$FILE_INFO" | awk '{print $1}')
        OWNER=$(echo "$FILE_INFO" | awk '{print $2}')
        GROUP=$(echo "$FILE_INFO" | awk '{print $3}')

        if [[ "$PERMISSIONS" -le 640 && "$OWNER" == "0" && ( "$GROUP" == "0" || "$GROUP" == "$(getent group daemon | cut -d: -f3)" ) ]]; then
            STATUS="Pass"
        else
            STATUS="Fail: /etc/at.deny permissions or ownership are incorrect."
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    l_group="root"
    if grep -Pq -- '^daemon\b' /etc/group; then
        l_group="daemon"
    fi

    if [ ! -e "/etc/at.allow" ]; then
        touch /etc/at.allow
    fi

    chown root:"$l_group" /etc/at.allow
    chmod u-x,g-wx,o-rwx /etc/at.allow

    if [ -e "/etc/at.deny" ]; then
        chown root:"$l_group" /etc/at.deny
        chmod u-x,g-wx,o-rwx /etc/at.deny
    fi
}
