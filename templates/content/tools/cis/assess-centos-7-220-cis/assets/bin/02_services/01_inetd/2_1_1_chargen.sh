#!/bin/sh

CRITICALITY=1
TITLE="Ensure chargen services are not enabled"

function check {
	chkconfig --list 2>&1 | grep chargen > /dev/null

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		chkconfig --list 2>&1 | grep chargen | grep ":on" > /dev/null
		if [ $? == 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	chkconfig chargen-dgram off
	chkconfig chargen-stream off
}
