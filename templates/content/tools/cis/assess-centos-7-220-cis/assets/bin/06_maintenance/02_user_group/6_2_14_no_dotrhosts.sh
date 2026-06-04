#!/bin/bash

CRITICALITY=1
TITLE="Ensure no users have .rhosts files"

function check {
	STATUS="Pass"
	for dir in `cat /etc/passwd | egrep -v '(root|halt|sync|shutdown)' | awk -F: '($7 != "/sbin/nologin") { print $6 }'`; do
		for file in $dir/.rhosts; do
			if [ ! -h "$file" -a -f "$file" ]; then
				STATUS="Fail"
				return
				echo ".rhosts file in $dir"
			fi
		done 
	done
}

function fix {
	echo "Manual";
}