#!/bin/bash

CRITICALITY=1
TITLE="Ensure ftp client are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' ftp 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: ftp is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y ftp
    apt autoremove -y
}
