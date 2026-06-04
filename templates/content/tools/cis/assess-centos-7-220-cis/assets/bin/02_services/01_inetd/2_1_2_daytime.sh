#!/bin/sh

CRITICALITY=1
TITLE="Ensure daytime services are not enabled"

function check {
	chkconfig --list 2>&1 | grep daytime > /dev/null

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		chkconfig --list 2>&1 | grep daytime | grep ":on" > /dev/null
		if [ $? == 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	chkconfig daytime-dgram off
	chkconfig daytime-stream off
}
