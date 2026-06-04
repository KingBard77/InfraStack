#!/bin/sh

CRITICALITY=1
TITLE="Ensure sticky bit is set on all world-writable directories"

function check {
	STATUS="Fail"
	df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -type d \( -perm -0002 -a ! -perm -1000 \) 2>&1  > /dev/null 

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -type d -perm -0002 2>/dev/null | xargs chmod a+t
}
