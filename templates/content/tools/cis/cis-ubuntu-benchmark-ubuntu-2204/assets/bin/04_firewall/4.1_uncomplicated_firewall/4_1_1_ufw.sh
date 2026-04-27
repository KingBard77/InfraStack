#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw is installed"

function check {
    STATUS="Fail"

    if dpkg-query -W -f='${Status}' ufw 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Pass"
    else
        STATUS="Fail: ufw is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install -y ufw
}
