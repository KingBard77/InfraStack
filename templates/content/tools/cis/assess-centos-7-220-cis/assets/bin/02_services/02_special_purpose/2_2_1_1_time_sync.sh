#!/bin/sh

CRITICALITY=1
TITLE="Ensure time synchronization is in use"

function check {
	rpm -q ntp 2>&1  > /dev/null

	if [ $? == 0 ]; then
		STATUS="Pass"
	else
		rpm -q chrony 2>&1  > /dev/null

		if [ $? == 0 ]; then
			STATUS="Pass"
		else
			STATUS="Fail"
		fi
	fi
}

function fix {
	yum remove ntp
	#yum install -y chrony
}