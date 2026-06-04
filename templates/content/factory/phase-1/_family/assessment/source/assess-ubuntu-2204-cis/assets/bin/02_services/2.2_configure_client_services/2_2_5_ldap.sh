#!/bin/bash

CRITICALITY=1
TITLE="Ensure ldap client are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' ldap-utils 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: ldap-utils is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y ldap-utils
    apt autoremove -y
}
