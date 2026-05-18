#!/bin/bash

CRITICALITY=1
TITLE="Ensure dnsmasq services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' dnsmasq 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Faild: dnsmasq is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop dnsmasq.service
    apt purge dnsmasq
    systemctl stop dnsmasq.service
    systemctl mask dnsmasq.service
}
