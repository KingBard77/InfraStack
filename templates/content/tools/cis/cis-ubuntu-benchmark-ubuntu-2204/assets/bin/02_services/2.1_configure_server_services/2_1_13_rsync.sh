#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsync services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' rsync 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: rsync is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop rsync.service
    apt purge rsync
    systemctl stop rsync.service
    systemctl mask rsync.service
}
