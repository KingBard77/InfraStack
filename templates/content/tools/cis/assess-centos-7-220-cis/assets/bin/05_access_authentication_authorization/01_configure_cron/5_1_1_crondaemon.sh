#!/bin/sh

CRITICALITY=1
TITLE="Ensure Cron Daemon is enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled crond > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl enable crond
}
