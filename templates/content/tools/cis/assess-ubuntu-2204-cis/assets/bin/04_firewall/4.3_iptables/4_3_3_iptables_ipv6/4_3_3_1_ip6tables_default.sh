#!/bin/sh

CRITICALITY=1
TITLE="Ensure ip6tables default deny firewall policy"

function check {
    STATUS="Pass"

    for CHAIN in INPUT FORWARD OUTPUT; do
        ip6tables -L "$CHAIN" | grep -E 'policy (DROP|REJECT)' > /dev/null 2>&1
        if [ $? != 0 ]; then
            STATUS="Fail"
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: ip6tables default-deny policy needs approved allow rules before enforcement.'
}
