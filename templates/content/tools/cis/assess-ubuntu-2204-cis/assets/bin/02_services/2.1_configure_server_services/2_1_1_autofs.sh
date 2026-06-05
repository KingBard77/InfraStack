#!/bin/bash

CRITICALITY=2
TITLE="Ensure autofs services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' autofs 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: autofs is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop autofs.service
    apt purge -y autofs
    systemctl stop autofs.service
    systemctl mask autofs.service
}
