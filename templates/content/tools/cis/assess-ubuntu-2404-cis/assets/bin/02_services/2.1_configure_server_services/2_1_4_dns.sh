#!/bin/bash

CRITICALITY=1
TITLE="Ensure dns server services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' bind9 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: bind9 is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop bind9.service
    apt purge bind9
    systemctl stop bind9.service
    systemctl mask bind9.service
}
