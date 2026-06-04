#!/bin/sh

CRITICALITY=1
TITLE="Ensure auditd service is enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled auditd > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl enable auditd
}