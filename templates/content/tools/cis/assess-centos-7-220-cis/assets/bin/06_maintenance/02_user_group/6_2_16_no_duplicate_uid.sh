#!/bin/bash

CRITICALITY=1
TITLE="Ensure no duplicate UIDs exist"

function check {
	STATUS="Pass"
	cat /etc/passwd | cut -f3 -d":" | sort -n | uniq -c | while read x ; do 
		[ -z "${x}" ] && break
		set - $x
		if [ $1 -gt 1 ]; then
			users=`awk -F: '($3 == n) { print $1 }' n=$2 /etc/passwd | xargs` 
			STATUS="Fail"
			return
			echo "Duplicate UID ($2): ${users}"
		fi
	done
}

function fix {
	echo "Manual";
}