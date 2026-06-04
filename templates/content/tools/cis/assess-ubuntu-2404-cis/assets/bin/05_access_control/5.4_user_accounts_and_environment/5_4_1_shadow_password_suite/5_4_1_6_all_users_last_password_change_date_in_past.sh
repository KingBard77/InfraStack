#!/bin/bash

CRITICALITY=1
TITLE="Ensure all users last password change date is in the past"

function check {
    STATUS="Pass"
    CURRENT_DATE=$(date +%s)
    FUTURE_USERS=0

    while IFS=: read -r user passwd lastchg rest; do
        if [ -z "$lastchg" ] || [ "$lastchg" -eq 0 ]; then
            continue
        fi

        LASTCHG_DATE=$(date -d "@$((lastchg * 86400))" +%s)

        if [ "$LASTCHG_DATE" -gt "$CURRENT_DATE" ]; then
            FUTURE_USERS=$((FUTURE_USERS + 1))
        fi
    done < /etc/shadow

    if [ "$FUTURE_USERS" -gt 0 ]; then
        STATUS="Fail"
    fi

    echo "Check status: $STATUS"
}

function fix {
    CURRENT_DATE=$(date +%s)

    while IFS=: read -r user passwd lastchg rest; do
        if [ -z "$lastchg" ] || [ "$lastchg" -eq 0 ]; then
            continue
        fi

        LASTCHG_DATE=$(date -d "@$((lastchg * 86400))" +%s)

        if [ "$LASTCHG_DATE" -gt "$CURRENT_DATE" ]; then
            echo "Expiring password for user $user"
            chage --lastday $(($(date +%s) / 86400)) $user
        fi
    done < /etc/shadow
}
