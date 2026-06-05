#!/bin/bash

CRITICALITY=1
TITLE="Ensure GDM disable-user-list option is enabled"

function check {
    STATUS="Pass"

    if ! grep -Rqs '^[[:space:]]*disable-user-list[[:space:]]*=[[:space:]]*true' /etc/dconf/db/gdm.d 2>/dev/null; then
        STATUS="Fail: GDM disable-user-list is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/dconf/db/gdm.d
    {
        printf '%s\n' '[org/gnome/login-screen]'
        printf '%s\n' 'disable-user-list=true'
    } > /etc/dconf/db/gdm.d/00-login-screen

    dconf update 2>/dev/null || true
}
