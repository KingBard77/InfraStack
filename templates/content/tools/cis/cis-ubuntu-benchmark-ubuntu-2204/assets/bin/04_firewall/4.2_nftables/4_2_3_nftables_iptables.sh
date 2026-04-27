#!/bin/bash

CRITICALITY=1
TITLE="Ensure iptables are flushed with nftables"

function check {
    STATUS="Fail"

    IPTABLES_EMPTY=$(iptables -L | grep -cE '^[^Chain]')
    IP6TABLES_EMPTY=$(ip6tables -L | grep -cE '^[^Chain]')

    if [ "$IPTABLES_EMPTY" -eq 0 ] && [ "$IP6TABLES_EMPTY" -eq 0 ]; then
        STATUS="Pass"
    else
        STATUS="Fail: iptables or ip6tables are not empty"
    fi

    echo "Check status: $STATUS"
}

function fix {
    iptables -t nat -F
    iptables -t mangle -F
    iptables -F
    iptables -X

    ip6tables -t nat -F
    ip6tables -t mangle -F
    ip6tables -F
    ip6tables -X
}

