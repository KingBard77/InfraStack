#!/bin/sh

CRITICALITY=1
TITLE="Ensure syslog-ng service is enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled syslog-ng > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	#systemctl enable syslog-ng
	echo "Manual"
}