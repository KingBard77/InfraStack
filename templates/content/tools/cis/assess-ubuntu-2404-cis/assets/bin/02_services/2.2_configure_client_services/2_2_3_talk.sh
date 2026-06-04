#!/bin/bash

CRITICALITY=1
TITLE="Ensure talk client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${db:Status-Status}\n' talk 2>/dev/null | grep -qx 'installed'; then
        STATUS="Fail: talk is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y talk
}
