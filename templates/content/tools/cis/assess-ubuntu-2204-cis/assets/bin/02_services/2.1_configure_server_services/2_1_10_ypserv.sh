#!/bin/bash

CRITICALITY=1
TITLE="Ensure nis server services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' ypserv 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: ypserv is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop ypserv.service
    apt purge ypserv
    systemctl stop ypserv.service
    systemctl mask ypserv.service
}
