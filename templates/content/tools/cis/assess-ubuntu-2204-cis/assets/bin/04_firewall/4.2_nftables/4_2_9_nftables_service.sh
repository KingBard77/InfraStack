#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables service is enabled"

function check {
    STATUS="Fail"

    if systemctl is-enabled nftables | grep -F 'enabled' > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: nftables service is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl enable nftables
    systemctl start nftables
}