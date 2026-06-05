#!/bin/sh

CRITICALITY=1
TITLE="Ensure iptables default deny firewall policy"

function check {
    STATUS="Pass"

    for CHAIN in INPUT FORWARD OUTPUT; do
        iptables -L "$CHAIN" | grep -E 'policy (DROP|REJECT)' > /dev/null 2>&1
        if [ $? != 0 ]; then
            STATUS="Fail"
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: iptables default-deny policy needs approved allow rules before enforcement.'
}
