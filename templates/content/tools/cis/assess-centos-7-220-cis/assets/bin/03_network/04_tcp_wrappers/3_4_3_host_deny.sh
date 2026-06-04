#!/bin/sh

CRITICALITY=1
TITLE="Ensure /etc/hosts.allow is configured"

function check {
	STATUS="Pass"

	cat /etc/hosts.deny | grep -v ^# &> /dev/null

	if [ $? != 0 ]; then
		STATUS="Fail"
	fi
}

function fix {
	echo "Manual/."
	#temp
	echo "ALL: ALL" > /etc/hosts.deny
}