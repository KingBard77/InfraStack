#!/bin/bash

CRITICALITY=1
TITLE="Ensure snmp services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' snmpd 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: snmp is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop snmpd.service
    apt purge snmpd
    systemctl stop snmpd.service
    systemctl mask snmpd.service
}
