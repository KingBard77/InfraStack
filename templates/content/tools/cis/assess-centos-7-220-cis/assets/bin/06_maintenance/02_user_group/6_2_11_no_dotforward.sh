#!/bin/bash

CRITICALITY=1
TITLE="Ensure no users have .forward files"

function check {
	STATUS="Pass"
	for dir in `cat /etc/passwd | awk -F: '{ print $6 }'`; do
		if [ ! -h "$dir/.forward" -a -f "$dir/.forward" ]; then
			STATUS="Fail"
			return
			echo ".forward file $dir/.forward exists" 
		fi
	done
}

function fix {
	echo "Manual";
}

