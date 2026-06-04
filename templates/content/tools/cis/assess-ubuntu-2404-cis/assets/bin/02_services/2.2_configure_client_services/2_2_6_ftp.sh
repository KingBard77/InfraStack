#!/bin/bash

CRITICALITY=1
TITLE="Ensure ftp client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${db:Status-Status}\n' ftp 2>/dev/null | grep -qx 'installed'; then
        STATUS="Fail: ftp is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y ftp
}
