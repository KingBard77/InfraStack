#!/bin/bash

CRITICALITY=1
TITLE="Ensure a nftables table exists"

function check {
    STATUS="Fail"

    if nft list tables | grep -q 'table inet filter'; then
        STATUS="Pass"
    else
        STATUS="Fail: 'inet filter' table does not exist"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v nft > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y nftables
    fi

    systemctl enable --now nftables 2>/dev/null || true
    nft list table inet filter > /dev/null 2>&1 || nft add table inet filter
}
