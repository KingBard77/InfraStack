#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw default deny firewall policy"

function check {
    STATUS="Fail"
    ufw status verbose 2>/dev/null | grep -Eiq 'Default: deny \(incoming\).*(deny|reject) \(outgoing\)' && STATUS="Pass" || STATUS="Fail: ufw default deny policy is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
