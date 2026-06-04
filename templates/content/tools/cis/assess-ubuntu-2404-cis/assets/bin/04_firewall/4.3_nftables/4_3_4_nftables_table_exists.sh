#!/bin/bash

CRITICALITY=1
TITLE="Ensure a nftables table exists"

function check {
    STATUS="Fail"
    nft list tables 2>/dev/null | grep -q '^table' && STATUS="Pass" || STATUS="Fail: nftables table does not exist"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
