#!/bin/bash

CRITICALITY=1
TITLE="Ensure ldap services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' slapd 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: slapd is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop slapd.service
    apt purge slapd
    systemctl stop slapd.service
    systemctl mask slapd.service
}
