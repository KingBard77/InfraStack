#!/bin/sh

CRITICALITY=1
TITLE="Ensure system administrator actions (sudolog) are collected"

function check {
	STATUS="Fail"

	grep actions /etc/audit/audit.rules | grep -E "/var/log/sudo.log"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /var/log/sudo.log -p wa -k actions" >> /etc/audit/audit.rules
}
