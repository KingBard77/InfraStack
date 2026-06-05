#!/bin/sh

CRITICALITY=1
TITLE="Ensure IPv6 status is identified"

function check {
    STATUS="Fail"

    if grep -Pqs '^\h*0\b' /sys/module/ipv6/parameters/disable; then
        STATUS="Pass"
    else
        echo "IPv6 is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: This control identifies IPv6 status; remediation is a policy choice.'
}
