#!/bin/sh

CRITICALITY=1
TITLE="Ensure no world writable files exist"

function check {
	STATUS="Fail"

	if [ $(df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -type f -perm -0002 | wc -l)  == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}