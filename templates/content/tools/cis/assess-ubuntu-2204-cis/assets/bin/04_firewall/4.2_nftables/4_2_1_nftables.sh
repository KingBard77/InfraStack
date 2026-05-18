#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables is installed"

function check {
    STATUS="Fail"

    if dpkg-query -W -f='${Status}' nftables 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Pass"
    else
        STATUS="Fail: nftables is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install nftables
}
