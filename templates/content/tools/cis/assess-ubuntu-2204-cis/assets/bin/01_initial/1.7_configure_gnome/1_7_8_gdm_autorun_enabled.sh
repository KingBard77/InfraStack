#!/bin/bash

CRITICALITY=1
TITLE="Ensure GDM autorun-never is enabled"

function check {
    STATUS="Pass"

    if ! grep -Rqs '^[[:space:]]*autorun-never[[:space:]]*=[[:space:]]*true' /etc/dconf/db/local.d /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM autorun-never is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d
    {
        printf '%s\n' '[org/gnome/desktop/media-handling]'
        printf '%s\n' 'autorun-never=true'
    } > /etc/dconf/db/local.d/00-cis-media-autorun

    dconf update 2>/dev/null || true
}
