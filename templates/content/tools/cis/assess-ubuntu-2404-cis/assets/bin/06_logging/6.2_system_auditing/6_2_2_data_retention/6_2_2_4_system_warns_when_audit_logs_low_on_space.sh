#!/bin/bash

CRITICALITY=2
TITLE="Ensure system warns when audit logs are low on space"

function check {
    space_left_action="email|exec|single|halt"
    admin_space_left_action="single|halt"
    STATUS="Fail"

    if grep -E "^space_left_action=(${space_left_action})" /etc/audit/auditd.conf > /dev/null 2>&1; then
        if grep -E "^admin_space_left_action=(${admin_space_left_action})" /etc/audit/auditd.conf > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Failed: admin_space_left_action is not set or incorrectly set"
        fi
    else
        STATUS="Failed: space_left_action is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    space_left_action="email|exec|single|halt"
    admin_space_left_action="single|halt"
    cp -a /etc/audit/auditd.conf /etc/audit/auditd.conf.$(date +"%s")

    sed -i '/^\s*space_left_action\s*/d' /etc/audit/auditd.conf
    sed -i '/^\s*admin_space_left_action\s*/d' /etc/audit/auditd.conf

	echo "space_left_action=${space_left_action}" | tee -a /etc/audit/auditd.conf > /dev/null
    echo "admin_space_left_action=${admin_space_left_action}" | tee -a /etc/audit/auditd.conf > /dev/null
}
