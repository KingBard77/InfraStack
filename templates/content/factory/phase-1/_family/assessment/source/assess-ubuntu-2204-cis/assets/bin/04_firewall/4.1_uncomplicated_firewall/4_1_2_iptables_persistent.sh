#!/bin/bash

CRITICALITY=1
TITLE="Ensure iptables-persistent is not installed with ufw"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' iptables-persistent 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: iptables-persistent is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y iptables-persistent
}
