#!/bin/sh

CRITICALITY=1
TITLE="Ensure use of privileged commands is collected"

function check {
	STATUS="Fail"

	find $(df / | tail -n1 | awk '{ print $1 }') -xdev \( -perm -4000 -o -perm -2000 \) -type f | awk '{print "-a always,exit -F path=" $1 " -F perm=x -F auid>=1000 -F auid!=4294967295 -k privileged" }' > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}