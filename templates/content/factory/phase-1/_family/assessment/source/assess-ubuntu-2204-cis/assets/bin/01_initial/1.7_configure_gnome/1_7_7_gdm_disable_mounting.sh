#!/bin/bash

CRITICALITY=2
TITLE="Ensure GDM disabling automatic mounting of removable media is not overridden"

function check {
    STATUS="Pass"
    LOCK_DIR="/etc/dconf/db/local.d/locks"

    if ! grep -Rqs '^/org/gnome/desktop/media-handling/automount$' "$LOCK_DIR" 2>/dev/null; then
        STATUS="Fail: GDM automount lock is not configured"
    elif ! grep -Rqs '^/org/gnome/desktop/media-handling/automount-open$' "$LOCK_DIR" 2>/dev/null; then
        STATUS="Fail: GDM automount-open lock is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d/locks
    {
        printf '%s\n' '/org/gnome/desktop/media-handling/automount'
        printf '%s\n' '/org/gnome/desktop/media-handling/automount-open'
    } > /etc/dconf/db/local.d/locks/00-cis-media-automount

    dconf update 2>/dev/null || true
}
