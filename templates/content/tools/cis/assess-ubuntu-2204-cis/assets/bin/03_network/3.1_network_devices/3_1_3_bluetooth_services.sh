#!/bin/bash

CRITICALITY=2
TITLE="Ensure bluetooth services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' bluez 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: telnet is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl stop bluetooth.service
    apt purge bluez
    systemctl stop bluetooth.service 
    systemctl mask bluetooth.service
}
