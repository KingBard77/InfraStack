#!/bin/bash

CRITICALITY=1
TITLE='Ensure journald log file rotation is configured'

function check {
    STATUS="Pass"

    if ! systemd-analyze cat-config systemd/journald.conf 2>/dev/null | grep -Eq '^[[:space:]]*(SystemMaxUse|RuntimeMaxUse|MaxFileSec)='; then
        STATUS="Fail: journald rotation limits are not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p /etc/systemd/journald.conf.d
    {
        printf '%s\n' '[Journal]'
        printf '%s\n' 'SystemMaxUse=1G'
        printf '%s\n' 'RuntimeMaxUse=1G'
        printf '%s\n' 'MaxFileSec=1month'
    } > /etc/systemd/journald.conf.d/60-cis-rotation.conf

    systemctl restart systemd-journald 2>/dev/null || true
}
