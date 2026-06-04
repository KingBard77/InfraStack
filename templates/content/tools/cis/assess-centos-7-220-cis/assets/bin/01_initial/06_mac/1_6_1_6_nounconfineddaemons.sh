#!/bin/sh

CRITICALITY=1
TITLE="Ensure no unconfined daemons exist"

function check {
	STATUS="Fail"

	ps -eZ | egrep "initrc" | egrep -vw "tr|ps|egrep|bash|awk" | tr ':' ' ' | awk '{ print $NF }' | 2>&1  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}