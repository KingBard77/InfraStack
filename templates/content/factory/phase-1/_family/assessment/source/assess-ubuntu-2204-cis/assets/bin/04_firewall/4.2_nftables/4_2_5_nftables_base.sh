#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables base chains exist"

function check {
    STATUS="Fail"

    INPUT_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook input')
    FORWARD_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook forward')
    OUTPUT_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook output')

    if [ "$INPUT_CHAIN_EXISTS" -gt 0 ] && [ "$FORWARD_CHAIN_EXISTS" -gt 0 ] && [ "$OUTPUT_CHAIN_EXISTS" -gt 0 ]; then
        STATUS="Pass"
    else
        STATUS="Fail: One or more base chains are missing"
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
    nft list chain inet filter input > /dev/null 2>&1 || nft add chain inet filter input '{ type filter hook input priority 0 ; policy accept ; }'
    nft list chain inet filter forward > /dev/null 2>&1 || nft add chain inet filter forward '{ type filter hook forward priority 0 ; policy accept ; }'
    nft list chain inet filter output > /dev/null 2>&1 || nft add chain inet filter output '{ type filter hook output priority 0 ; policy accept ; }'
}
