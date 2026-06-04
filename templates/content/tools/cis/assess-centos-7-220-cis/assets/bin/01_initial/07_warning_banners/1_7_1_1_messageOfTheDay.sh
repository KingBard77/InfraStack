#!/bin/sh

CRITICALITY=1
TITLE="Ensure message of the day is configured properly"

function check {
	STATUS="Fail"

	egrep '(\\v|\\r|\\m|\\s)' /etc/motd | 2>&1  > /dev/null 

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}