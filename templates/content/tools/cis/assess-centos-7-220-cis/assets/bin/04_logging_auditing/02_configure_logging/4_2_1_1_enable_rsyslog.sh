#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsyslog Service is enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled rsyslog > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl enable rsyslog
}