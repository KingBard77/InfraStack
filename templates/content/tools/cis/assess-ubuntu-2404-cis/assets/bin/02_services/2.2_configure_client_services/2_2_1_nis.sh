#!/bin/bash

CRITICALITY=1
TITLE="Ensure NIS Client is not installed"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' nis 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: nis is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y nis
    apt autoremove -y
}
