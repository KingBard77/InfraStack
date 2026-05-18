#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables loopback traffic is configured"

function check {
    STATUS="Fail"

    INPUT_LOOPBACK_EXISTS=$(sudo nft list ruleset | grep -c 'iif "lo" accept')
    INPUT_LOOPBACK_DROP_EXISTS=$(sudo nft list ruleset | grep -c 'ip saddr 127.0.0.0/8 counter drop')
    INPUT_IPV6_LOOPBACK_DROP_EXISTS=$(sudo nft list ruleset | grep -c 'ip6 saddr ::1 counter drop')

    if [ "$INPUT_LOOPBACK_EXISTS" -gt 0 ] && [ "$INPUT_LOOPBACK_DROP_EXISTS" -gt 0 ] && [ "$INPUT_IPV6_LOOPBACK_DROP_EXISTS" -gt 0 ]; then
        STATUS="Pass"
    else
        STATUS="Fail: One or more loopback traffic rules are missing"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
    echo "sudo nft add rule inet filter input iif lo accept"
    echo "sudo nft add rule inet filter input ip saddr 127.0.0.0/8 counter drop"
    echo "sudo nft add rule inet filter input ip6 saddr ::1 counter drop"
}