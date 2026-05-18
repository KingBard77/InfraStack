#!/bin/sh

CRITICALITY=1
TITLE="Ensure no files or directories without an owner and a group exist"

function check {
	STATUS="Fail"

	if [ $(df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -nouser | wc -l)  == 0 ]; then
		if [ $(df --local -P | awk '{ if (NR!=1) print $6 }' | xargs -I '{}' find '{}' -xdev -nogroup | wc -l)  == 0 ]; then
			STATUS="Pass"
		else	
			echo "There is nogrouped files or directories exist"
		fi
	else
		echo "There is unowned files or directories exist"
	fi
}

function fix {
	echo "Manual"
}