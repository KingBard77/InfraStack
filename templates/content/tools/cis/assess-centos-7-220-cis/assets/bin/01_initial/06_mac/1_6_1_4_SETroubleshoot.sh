#!/bin/sh

CRITICALITY=1
TITLE="Ensure SETroubleshoot is not installed"

function check {
	STATUS="Fail"

	rpm -q setroubleshoot | 2>&1 grep -E "package setroubleshoot is not installed"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	yum remove -y setroubleshoot
}