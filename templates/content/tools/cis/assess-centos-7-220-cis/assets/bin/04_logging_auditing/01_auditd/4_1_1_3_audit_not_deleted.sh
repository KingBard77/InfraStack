#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit logs are not automatically deleted"

function check {
	STATUS="Fail"

	grep max_log_file_action /etc/audit/auditd.conf | grep keep_logs  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "max_log_file_action = keep_logs" >> /etc/audit/auditd.conf
}