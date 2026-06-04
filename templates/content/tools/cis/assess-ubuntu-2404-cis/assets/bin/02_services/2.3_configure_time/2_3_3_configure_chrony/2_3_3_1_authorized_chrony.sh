#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is configured with authorized timeserver"
function check {
    STATUS="Fail"

    if grep -RE '^\s*(server|pool)\s+\S+' /etc/chrony/chrony.conf /etc/chrony/conf.d/*.conf /etc/chrony/sources.d/*.sources > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: chrony has no configured time source"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires site-approved chrony time sources.'
}
