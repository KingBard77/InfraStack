#!/bin/bash

CRITICALITY=1
TITLE="Ensure telnet client are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' telnet 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: telnet is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y telnet
    apt autoremove -y
}
