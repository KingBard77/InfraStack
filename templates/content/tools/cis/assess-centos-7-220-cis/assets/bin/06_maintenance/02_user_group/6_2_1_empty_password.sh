#!/bin/sh

CRITICALITY=1
TITLE="Ensure password fields are not empty"

function check {
	STATUS="Fail"

	if [ $(cat /etc/shadow | awk -F: '($2 == "" ) { print $1 " does not have a password "}' | wc -l)  == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual";
}