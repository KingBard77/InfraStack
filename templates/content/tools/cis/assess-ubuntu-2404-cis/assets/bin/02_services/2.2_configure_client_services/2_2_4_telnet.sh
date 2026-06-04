#!/bin/bash

CRITICALITY=1
TITLE="Ensure telnet client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${db:Status-Status}\n' telnet 2>/dev/null | grep -qx 'installed'; then
        STATUS="Fail: telnet is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y telnet
}
