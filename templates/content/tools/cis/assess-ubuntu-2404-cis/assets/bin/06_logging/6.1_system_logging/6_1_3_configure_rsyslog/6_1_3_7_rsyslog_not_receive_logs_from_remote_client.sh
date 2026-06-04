#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsyslog is not configured to receive logs from a remote client"
function check {
    STATUS="Pass"

    if grep -RE '^\s*(module\(load="imtcp"\)|input\(type="imtcp"|\$ModLoad\s+imtcp|\$UDPServerRun|\$InputTCPServerRun)' /etc/rsyslog.conf /etc/rsyslog.d/*.conf > /dev/null 2>&1; then
        STATUS="Fail: rsyslog is configured to receive remote logs"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires review before disabling remote log listeners.'
}
