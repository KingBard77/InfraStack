#!/bin/bash

CRITICALITY=1
TITLE="Ensure iptables packages are installed"

function check {
    STATUS="Fail"

    if dpkg-query -l iptables iptables-persistent | grep -q '^ii'; then
        STATUS="Pass"
    else
        STATUS="Fail: iptables packages are not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install -y iptables iptables-persistent
}
