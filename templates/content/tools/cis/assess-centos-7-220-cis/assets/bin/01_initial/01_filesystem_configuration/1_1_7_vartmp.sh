#!/bin/sh

CRITICALITY=1
TITLE="Ensure separate partition exists for /var/tmp"

function check {
	STATUS="Fail"

	mount | grep /var/tmp 2>&1 | grep -E "/var/tmp"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}