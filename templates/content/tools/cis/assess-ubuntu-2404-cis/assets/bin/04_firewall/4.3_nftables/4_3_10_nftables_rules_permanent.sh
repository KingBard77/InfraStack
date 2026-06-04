#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables rules are permanent"

function check {
    STATUS="Fail"
    test -s /etc/nftables.conf && grep -Eq '^\s*include\s+|^\s*table\s+' /etc/nftables.conf && STATUS="Pass" || STATUS="Fail: nftables rules are not permanent"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
