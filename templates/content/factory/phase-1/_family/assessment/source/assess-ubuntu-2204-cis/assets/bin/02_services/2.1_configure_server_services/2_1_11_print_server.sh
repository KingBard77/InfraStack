#!/bin/bash

CRITICALITY=2
TITLE="Ensure cups services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' cups 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: cups is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop cups.socket cups.service
    apt purge cups
    systemctl stop cups.socket cups.service
    systemctl mask cups.socket cups.service
}
