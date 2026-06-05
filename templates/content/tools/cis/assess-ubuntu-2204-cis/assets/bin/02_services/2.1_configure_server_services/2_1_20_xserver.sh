#!/bin/bash

CRITICALITY=2
TITLE="Ensure xserver-common services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' xserver-common 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: xserver-common is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge xserver-common
}
