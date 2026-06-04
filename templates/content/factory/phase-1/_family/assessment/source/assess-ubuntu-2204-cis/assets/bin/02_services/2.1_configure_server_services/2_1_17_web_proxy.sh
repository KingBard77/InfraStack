#!/bin/bash

CRITICALITY=1
TITLE="Ensure web proxy services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' squid 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: squid is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop squid.service
    apt purge squid
    systemctl stop squid.service
    systemctl mask squid.service
}
