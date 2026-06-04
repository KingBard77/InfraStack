#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsh client is not installed"

function check {
	STATUS="Fail"

	rpm -q rsh 2>&1  > /dev/null 

	if [ $? != 0 ]; then
		STATUS="Pass"	
	fi
}

function fix {
	yum remove -y rsh
}
