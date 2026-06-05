#!/bin/bash

CRITICALITY=1
TITLE="Ensure GDM autorun-never is not overridden"

function check {
    STATUS="Pass"
    LOCK_DIR="/etc/dconf/db/local.d/locks"

    if ! grep -Rqs '^/org/gnome/desktop/media-handling/autorun-never$' "$LOCK_DIR" 2>/dev/null; then
        STATUS="Fail: GDM autorun-never lock is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d/locks
    printf '%s\n' '/org/gnome/desktop/media-handling/autorun-never' > /etc/dconf/db/local.d/locks/00-cis-media-autorun

    dconf update 2>/dev/null || true
}
