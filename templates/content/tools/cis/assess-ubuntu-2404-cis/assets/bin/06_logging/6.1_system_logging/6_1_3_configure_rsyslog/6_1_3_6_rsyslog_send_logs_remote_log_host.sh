#!/bin/bash

CRITICALITY=1
TITLE='Ensure rsyslog is configured to send logs to a remote log host'

function check {
    STATUS="Pass"

    if ! grep -R '^[^#].*@' /etc/rsyslog.conf /etc/rsyslog.d 2>/dev/null | grep -q .; then
        STATUS="Fail: rsyslog remote log host forwarding was not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation is intentionally disabled; review the failed resources and apply approved changes.'
}
