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
    echo "Manual"

    for POLICY in INPUT FORWARD OUTPUT; do
        ip6tables -P "$POLICY"
    done
    
    # ip6tables -P INPUT DROP
    # ip6tables -P FORWARD DROP
    # ip6tables -P OUTPUT DROP
}
