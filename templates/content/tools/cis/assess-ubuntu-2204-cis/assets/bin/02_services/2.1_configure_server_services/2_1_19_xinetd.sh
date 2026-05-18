#!/bin/bash

CRITICALITY=1
TITLE="Ensure xinetd services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' -l xinetd 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: xinetd is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop xinetd.service
    apt purge xinetd
    systemctl stop xinetd.service
    systemctl mask xinetd.service
}
