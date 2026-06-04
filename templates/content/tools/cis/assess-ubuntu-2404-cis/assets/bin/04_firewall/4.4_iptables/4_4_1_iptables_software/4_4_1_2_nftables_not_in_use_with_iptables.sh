#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables is not in use with iptables"

function check {
    STATUS="Fail"
    if ! command -v nft > /dev/null 2>&1 || ! nft list ruleset 2>/dev/null | grep -q '^table'; then STATUS="Pass"; else STATUS="Fail: nftables is in use with iptables"; fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
