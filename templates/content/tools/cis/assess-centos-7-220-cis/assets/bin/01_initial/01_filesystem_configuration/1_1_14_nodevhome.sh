#!/bin/sh

CRITICALITY=1
TITLE="Ensure nodev option set on /home partition"

function check {
	STATUS="Fail"

	mount | grep /home 2>&1 | grep -E "/nodev"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}
