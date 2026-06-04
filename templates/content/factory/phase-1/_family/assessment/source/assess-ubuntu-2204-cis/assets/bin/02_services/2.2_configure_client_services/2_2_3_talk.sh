#!/bin/bash

CRITICALITY=1
TITLE="Ensure talk client are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' talk 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: talk is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y talk
    apt autoremove -y
}
