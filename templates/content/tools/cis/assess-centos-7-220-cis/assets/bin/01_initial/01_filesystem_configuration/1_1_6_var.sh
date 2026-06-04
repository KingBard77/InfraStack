#!/bin/sh

CRITICALITY=1
TITLE="Ensure separate partition exists for /var"

function check {
	STATUS="Fail"

	mount | grep /var 2>&1 | grep -E "/var"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}