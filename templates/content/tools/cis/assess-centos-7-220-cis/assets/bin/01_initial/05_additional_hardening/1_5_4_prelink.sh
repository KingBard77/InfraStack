#!/bin/sh

CRITICALITY=1
TITLE="Ensure prelink is disabled"

function check {
	STATUS="Fail"

	rpm -q prelink 2>&1 | grep -E "package prelink is not installed"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	prelink -ua
	yum remove -y prelink
}