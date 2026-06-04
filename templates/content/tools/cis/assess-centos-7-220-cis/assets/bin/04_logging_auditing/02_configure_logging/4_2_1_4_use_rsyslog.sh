#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsyslog is configured to send logs to a remote log host"

function check {
	STATUS="Fail"

	grep "^*.*[^I][^I]*@" /etc/rsyslog.conf  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}