#!/bin/bash

CRITICALITY=1
TITLE="Ensure no duplicate user names exist"

function check {
	STATUS="Pass"
	cat /etc/passwd | cut -f1 -d":" | sort -n | uniq -c | while read x ; do 
		[ -z "${x}" ] && break
		set - $x
		if [ $1 -gt 1 ]; then
			uids=`awk -F: '($1 == n) { print $3 }' n=$2 /etc/passwd | xargs`
			STATUS="Fail"
			return
			echo "Duplicate User Name ($2): ${uids}"
		fi
	done
}

function fix {
	echo "Manual";
}