#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw is not in use with iptables"

function check {
    STATUS="Fail"
    if ! command -v ufw > /dev/null 2>&1 || ! ufw status 2>/dev/null | grep -qi '^Status: active'; then STATUS="Pass"; else STATUS="Fail: ufw is in use with iptables"; fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
