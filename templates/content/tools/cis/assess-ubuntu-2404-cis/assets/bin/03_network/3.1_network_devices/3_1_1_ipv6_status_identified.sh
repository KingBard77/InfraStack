#!/bin/bash

CRITICALITY=1
TITLE='Ensure IPv6 status is identified'

function check {
    STATUS="Pass: IPv6 status identified"
    IPV6_DISABLED="$(sysctl -n net.ipv6.conf.all.disable_ipv6 2>/dev/null)"

    if [[ "$IPV6_DISABLED" == "1" ]]; then
        STATUS="Pass: IPv6 is disabled"
    elif [[ "$IPV6_DISABLED" == "0" ]]; then
        STATUS="Pass: IPv6 is enabled"
    else
        STATUS="Fail: unable to identify IPv6 status"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation is intentionally disabled; review the failed resources and apply approved changes.'
}
