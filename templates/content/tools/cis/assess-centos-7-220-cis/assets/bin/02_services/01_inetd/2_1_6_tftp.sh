#!/bin/sh

CRITICALITY=1
TITLE="Ensure tftp services are not enabled"

function check {
	chkconfig --list 2>&1 | grep tftp > /dev/null

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		chkconfig --list 2>&1 | grep tftp | grep ":on" > /dev/null
		if [ $? == 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	chkconfig tftp off
}