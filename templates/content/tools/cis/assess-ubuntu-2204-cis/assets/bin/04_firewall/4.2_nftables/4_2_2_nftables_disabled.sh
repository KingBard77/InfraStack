#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw is uninstalled or disabled with nftables"

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
    ufw disable
	systemctl stop ufw.service
	systemctl mask ufw.service
}
