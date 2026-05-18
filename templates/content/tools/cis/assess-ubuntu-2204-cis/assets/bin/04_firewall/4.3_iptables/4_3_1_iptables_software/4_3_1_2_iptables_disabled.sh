#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables is not installed with iptables"

function check {
    STATUS="Fail"

    if dpkg-query -W -f='${binary:Package}\t${Status}\t${db:Status-Status}\n' nftables > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: nftables is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt purge -y nftables
}