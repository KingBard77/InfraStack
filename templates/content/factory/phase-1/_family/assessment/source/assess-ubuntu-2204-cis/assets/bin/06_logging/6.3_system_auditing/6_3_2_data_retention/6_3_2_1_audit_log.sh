#!/bin/sh

CRITICALITY=2
TITLE="Ensure audit log storage size is configured"

max_log_file="8"

function check {
    STATUS="Fail"

    if grep -E "^max_log_file=${max_log_file}" /etc/audit/auditd.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: max_log_file is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/audit/auditd.conf /etc/audit/auditd.conf.$(date +"%s")

    sed -i '/^\s*max_log_file\s*/d' /etc/audit/auditd.conf

    echo "max_log_file=${max_log_file}" | tee -a /etc/audit/auditd.conf > /dev/null
}