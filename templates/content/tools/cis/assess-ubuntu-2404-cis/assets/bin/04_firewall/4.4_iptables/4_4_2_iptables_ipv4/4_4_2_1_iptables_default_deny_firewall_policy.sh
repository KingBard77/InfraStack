#!/bin/bash

CRITICALITY=1
TITLE="Ensure iptables default deny firewall policy"

function check {
    STATUS="Fail"
    iptables -S 2>/dev/null | grep -Eq '^-P (INPUT|FORWARD|OUTPUT) (DROP|REJECT)' && STATUS="Pass" || STATUS="Fail: iptables default deny policy is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
