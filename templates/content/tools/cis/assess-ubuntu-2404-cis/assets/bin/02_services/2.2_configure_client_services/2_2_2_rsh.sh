#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsh client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${db:Status-Status}\n' rsh-client 2>/dev/null | grep -qx 'installed'; then
        STATUS="Fail: rsh-client is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y rsh-client
}
