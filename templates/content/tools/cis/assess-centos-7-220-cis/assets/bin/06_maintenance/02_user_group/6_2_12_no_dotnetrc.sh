#!/bin/bash

CRITICALITY=1
TITLE="Ensure no users have .forward files"

function check {
	STATUS="Pass"
	for dir in `cat /etc/passwd | awk -F: '{ print $6 }'`; do
		if [ ! -h "$dir/.netrc" -a -f "$dir/.netrc" ]; then
			STATUS="Fail"
			return
			echo ".netrc file $dir/.netrc exists"
		fi
	done
}

function fix {
	echo "Manual";
}