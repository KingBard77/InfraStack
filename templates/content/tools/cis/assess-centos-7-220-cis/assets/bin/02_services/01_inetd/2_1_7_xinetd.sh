#!/bin/sh

CRITICALITY=1
TITLE="Ensure xinetd is not enabled"

function check {
	systemctl is-enabled xinetd 2>&1 > /dev/null  

	if [ $? != 0 ]; then
		STATUS="Pass"
	else
		STATUS="Fail"
	fi
}

function fix {
	systemctl disable xinetd
}
