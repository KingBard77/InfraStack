#!/bin/sh

CRITICALITY=1
TITLE="Ensure the MCS Translation Service (mcstrans) is not installed"

function check {
	STATUS="Fail"

	rpm -q mcstrans | 2>&1 grep -E "package mcstrans is not installed"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	yum remove -y mcstrans
}




