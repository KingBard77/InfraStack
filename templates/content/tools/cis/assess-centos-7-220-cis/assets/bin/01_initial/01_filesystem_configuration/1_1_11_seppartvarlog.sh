#!/bin/sh

CRITICALITY=1
TITLE="Ensure separate partition exists for /var/log"

function check {
	STATUS="Fail"

	mount | grep /var/log 2>&1 | grep -E "/var/log"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi

}

function fix {
	echo "Manual"	
}