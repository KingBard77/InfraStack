#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables loopback traffic is configured"

function check {
    STATUS="Fail"
    nft list ruleset 2>/dev/null | grep -Eq 'iifname "lo" accept|ip saddr 127\.0\.0\.0/8.*drop|ip6 saddr ::1.*drop' && STATUS="Pass" || STATUS="Fail: nftables loopback traffic is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
