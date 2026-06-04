#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables base chains exist"

function check {
    STATUS="Fail"
    nft list ruleset 2>/dev/null | grep -Eq 'type filter hook (input|forward|output)' && STATUS="Pass" || STATUS="Fail: nftables base chains do not exist"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
