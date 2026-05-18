#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit logs are not automatically deleted"

max_log_file_action="keep_logs"

function check {
    STATUS="Fail"

    if grep -E "^max_log_file_action=${max_log_file_action}" /etc/audit/auditd.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: max_log_file_action is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/audit/auditd.conf /etc/audit/auditd.conf.$(date +"%s")

    sed -i '/^\s*max_log_file_action\s*/d' /etc/audit/auditd.conf

    echo "max_log_file_action=${max_log_file_action}" | tee -a /etc/audit/auditd.conf > /dev/null
}