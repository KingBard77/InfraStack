#!/bin/bash

CRITICALITY=1
TITLE="Ensure dhcp services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' isc-dhcp-server 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: isc-dhcp-server is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop isc-dhcp-server.service isc-dhcp-server6.service
    apt purge isc-dhcp-server
    systemctl stop isc-dhcp-server.service isc-dhcp-server6.service
    systemctl mask isc-dhcp-server isc-dhcp-server6.service
}
