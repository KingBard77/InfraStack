#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables default deny firewall policy"

function check {
    STATUS="Fail"
    nft list ruleset 2>/dev/null | grep -Eq 'policy drop|policy reject' && STATUS="Pass" || STATUS="Fail: nftables default deny policy is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
