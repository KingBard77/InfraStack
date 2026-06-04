#!/bin/sh

CRITICALITY=1
TITLE="Ensure time services are not enabled"

function check {
	chkconfig --list 2>&1 | grep "time" > /dev/null

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		chkconfig --list 2>&1 | grep "time" | grep ":on" > /dev/null
		if [ $? == 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	chkconfig time-dgram off
	chkconfig time-stream off
}