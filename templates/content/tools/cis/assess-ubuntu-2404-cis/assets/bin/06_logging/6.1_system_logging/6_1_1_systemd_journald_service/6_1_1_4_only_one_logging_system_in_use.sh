#!/bin/bash

CRITICALITY=1
TITLE="Ensure only one logging system is in use"
function check {
    ACTIVE=0
    STATUS="Fail"

    systemctl is-active systemd-journald > /dev/null 2>&1 && ACTIVE=$((ACTIVE + 1))
    systemctl is-active rsyslog > /dev/null 2>&1 && ACTIVE=$((ACTIVE + 1))
    systemctl is-active systemd-journal-remote > /dev/null 2>&1 && ACTIVE=$((ACTIVE + 1))

    if [[ "$ACTIVE" -eq 1 ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: zero or multiple logging systems are active"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires choosing the approved logging system.'
}
