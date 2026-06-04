#!/bin/bash

CRITICALITY=1
TITLE="Ensure GDM screen locks cannot be overridden"

function check {
    STATUS="Pass"
    LOCK_DIR="/etc/dconf/db/local.d/locks"

    if ! grep -Rqs '^/org/gnome/desktop/session/idle-delay$' "$LOCK_DIR" 2>/dev/null; then
        STATUS="Fail: GDM idle-delay lock is not configured"
    elif ! grep -Rqs '^/org/gnome/desktop/screensaver/lock-delay$' "$LOCK_DIR" 2>/dev/null; then
        STATUS="Fail: GDM lock-delay lock is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/local.d/locks
    {
        printf '%s\n' '/org/gnome/desktop/session/idle-delay'
        printf '%s\n' '/org/gnome/desktop/screensaver/lock-delay'
    } > /etc/dconf/db/local.d/locks/00-cis-screensaver

    dconf update 2>/dev/null || true
}
