#!/bin/bash

CRITICALITY=1
TITLE='Ensure iptables are flushed with nftables'

function check {
    STATUS="Pass"

    if iptables -S 2>/dev/null | grep -Ev '^-(P|A) (INPUT|FORWARD|OUTPUT) ACCEPT$' | grep -q '^-A'; then
        STATUS="Fail: iptables still has active rules while nftables is selected"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for TABLE in filter nat mangle raw security; do
        iptables -t "$TABLE" -F 2>/dev/null || true
        iptables -t "$TABLE" -X 2>/dev/null || true
        ip6tables -t "$TABLE" -F 2>/dev/null || true
        ip6tables -t "$TABLE" -X 2>/dev/null || true
    done
}
