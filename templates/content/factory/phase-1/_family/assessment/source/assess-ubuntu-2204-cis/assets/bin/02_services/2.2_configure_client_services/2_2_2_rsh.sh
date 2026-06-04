#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsh client are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' rsh-client 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: rsh-client is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y rsh-client
    apt autoremove -y
}
