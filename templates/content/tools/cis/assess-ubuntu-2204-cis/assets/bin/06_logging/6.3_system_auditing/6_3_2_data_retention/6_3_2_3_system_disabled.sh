#!/bin/sh

CRITICALITY=1
TITLE="Ensure system is disabled when audit logs are full"

disk_full_action="halt|single"
disk_error_action="syslog|single|halt"

function check {
    STATUS="Fail"

    if grep -E "^disk_full_action=(${disk_full_action})" /etc/audit/auditd.conf > /dev/null 2>&1; then
        if grep -E "^disk_error_action=(${disk_error_action})" /etc/audit/auditd.conf > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Failed: disk_error_action is not set or incorrectly set"
        fi
    else
        STATUS="Failed: disk_full_action is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/audit/auditd.conf /etc/audit/auditd.conf.$(date +"%s")

    sed -i '/^\s*disk_full_action\s*/d' /etc/audit/auditd.conf
    sed -i '/^\s*disk_error_action\s*/d' /etc/audit/auditd.conf

    echo "disk_full_action=${disk_full_action}" | tee -a /etc/audit/auditd.conf > /dev/null
    echo "disk_error_action=${disk_error_action}" | tee -a /etc/audit/auditd.conf > /dev/null
}