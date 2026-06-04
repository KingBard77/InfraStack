#!/bin/bash

CRITICALITY=1
TITLE="Ensure rsyslog log file creation mode is configured"
function check {
    STATUS="Fail"

    if grep -RE '^\s*\$FileCreateMode\s+0?640\b' /etc/rsyslog.conf /etc/rsyslog.d/*.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: rsyslog FileCreateMode is not 0640"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/rsyslog.conf /etc/rsyslog.conf.$(date +"%s")
    sed -i '/^\s*\$FileCreateMode\s\+/d' /etc/rsyslog.conf
    echo '$FileCreateMode 0640' | tee -a /etc/rsyslog.conf > /dev/null
    systemctl restart rsyslog
}
