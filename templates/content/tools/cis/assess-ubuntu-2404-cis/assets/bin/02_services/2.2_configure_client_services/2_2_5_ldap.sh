#!/bin/bash

CRITICALITY=1
TITLE="Ensure ldap client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${db:Status-Status}\n' ldap-utils 2>/dev/null | grep -qx 'installed'; then
        STATUS="Fail: ldap-utils is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y ldap-utils
}
