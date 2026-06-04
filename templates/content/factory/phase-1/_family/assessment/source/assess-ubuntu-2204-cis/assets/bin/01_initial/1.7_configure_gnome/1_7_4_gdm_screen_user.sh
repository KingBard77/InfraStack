#!/bin/bash

CRITICALITY=1
TITLE="Ensure GDM screen locks when the user is idle"

function check {
    STATUS="Pass"

    if ! grep -Rqs '^[[:space:]]*idle-delay[[:space:]]*=[[:space:]]*uint32[[:space:]]*[1-9][0-9]*' /etc/dconf/db/local.d /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM idle-delay is not configured"
    elif ! grep -Rqs '^[[:space:]]*lock-delay[[:space:]]*=[[:space:]]*uint32[[:space:]]*[0-9]' /etc/dconf/db/local.d /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM lock-delay is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d
    {
        printf '%s\n' '[org/gnome/desktop/session]'
        printf '%s\n' 'idle-delay=uint32 900'
        printf '%s\n' '[org/gnome/desktop/screensaver]'
        printf '%s\n' 'lock-delay=uint32 5'
    } > /etc/dconf/db/local.d/00-cis-screensaver

    dconf update 2>/dev/null || true
}
