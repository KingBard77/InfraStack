#!/bin/bash

CRITICALITY=1
TITLE="Ensure a single firewall configuration utility is in use"

function check {
    ACTIVE=0
    STATUS="Fail"
    command -v ufw > /dev/null 2>&1 && ufw status 2>/dev/null | grep -qi '^Status: active' && ACTIVE=$((ACTIVE + 1))
    command -v nft > /dev/null 2>&1 && nft list ruleset 2>/dev/null | grep -q '^table' && ACTIVE=$((ACTIVE + 1))
    command -v iptables > /dev/null 2>&1 && iptables -S 2>/dev/null | grep -Ev '^-P|^-N' | grep -q . && ACTIVE=$((ACTIVE + 1))
    if [[ "$ACTIVE" -eq 1 ]]; then STATUS="Pass"; else STATUS="Fail: exactly one firewall utility is not active"; fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires choosing ufw, nftables, or iptables.'
}
