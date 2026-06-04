#!/bin/bash

CRITICALITY=1
TITLE="Ensure iptables loopback traffic is configured"

function check {
    STATUS="Fail"
    iptables -S INPUT 2>/dev/null | grep -Eq '^-A INPUT -i lo -j ACCEPT' && iptables -S INPUT 2>/dev/null | grep -Eq '127\.0\.0\.0/8.*DROP|127\.0\.0\.0/8.*REJECT' && STATUS="Pass" || STATUS="Fail: iptables loopback traffic is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
