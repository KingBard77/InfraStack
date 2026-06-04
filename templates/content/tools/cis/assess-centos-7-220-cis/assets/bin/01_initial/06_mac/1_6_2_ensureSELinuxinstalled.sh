#!/bin/sh

CRITICALITY=1
TITLE="Ensure SELinux is installed"

function check {
	STATUS="Fail"

	rpm -q libselinux | 2>&1 grep -E "libselinux-"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	yum install -y libselinux
}




