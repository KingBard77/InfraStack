#!/bin/bash

CRITICALITY=1
TITLE="Ensure journald log file access is configured"

function check {
    STATUS="Fail"
    FILE="/usr/lib/tmpfiles.d/systemd.conf"

    if [ -f /etc/tmpfiles.d/systemd.conf ]; then
        FILE="/etc/tmpfiles.d/systemd.conf"
    fi

    FILE_PERMISSIONS=$(stat -c "%a" $FILE)

    if [ "$FILE_PERMISSIONS" -le 640 ]; then
        STATUS="Pass"
    else
        echo "Failed: $FILE has permissions $FILE_PERMISSIONS"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ ! -f /etc/tmpfiles.d/systemd.conf ]; then
        cp /usr/lib/tmpfiles.d/systemd.conf /etc/tmpfiles.d/systemd.conf
    fi

    chmod 0640 /etc/tmpfiles.d/systemd.conf
}