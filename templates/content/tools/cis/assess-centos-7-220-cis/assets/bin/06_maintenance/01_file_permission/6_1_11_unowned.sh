#!/bin/sh

CRITICALITY=1
TITLE="Ensure no unowned files or directories exist"

function check {
	STATUS="Fail"

	if [ $(df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -nouser | wc -l)  == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}