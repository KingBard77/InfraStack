#!/bin/sh

CRITICALITY=1
TITLE="Ensure echo services are not enabled "

function check {
	chkconfig --list 2>&1 | grep "echo" > /dev/null

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		chkconfig --list 2>&1 | grep "echo" | grep ":on" > /dev/null
		if [ $? == 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	chkconfig echo-dgram off
	chkconfig echo-stream off
}