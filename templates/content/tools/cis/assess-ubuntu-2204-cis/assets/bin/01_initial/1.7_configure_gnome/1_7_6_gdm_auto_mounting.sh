#!/bin/bash

CRITICALITY=2
TITLE="Ensure GDM automatic mounting of removable media is disabled"

function check {
    STATUS="Pass"

    if ! grep -Rqs '^[[:space:]]*automount[[:space:]]*=[[:space:]]*false' /etc/dconf/db/local.d /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM automount is not disabled"
    elif ! grep -Rqs '^[[:space:]]*automount-open[[:space:]]*=[[:space:]]*false' /etc/dconf/db/local.d /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM automount-open is not disabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d
    {
        printf '%s\n' '[org/gnome/desktop/media-handling]'
        printf '%s\n' 'automount=false'
        printf '%s\n' 'automount-open=false'
    } > /etc/dconf/db/local.d/00-cis-media-automount

    dconf update 2>/dev/null || true
}
