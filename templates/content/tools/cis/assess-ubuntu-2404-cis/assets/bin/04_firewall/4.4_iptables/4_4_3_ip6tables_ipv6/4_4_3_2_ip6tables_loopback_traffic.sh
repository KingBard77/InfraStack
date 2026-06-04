#!/bin/bash

CRITICALITY=1
TITLE="Ensure ip6tables loopback traffic is configured"

function check {
    STATUS="Fail"
    ip6tables -S INPUT 2>/dev/null | grep -Eq '^-A INPUT -i lo -j ACCEPT' && ip6tables -S INPUT 2>/dev/null | grep -Eq '::1.*DROP|::1.*REJECT' && STATUS="Pass" || STATUS="Fail: ip6tables loopback traffic is not configured"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
