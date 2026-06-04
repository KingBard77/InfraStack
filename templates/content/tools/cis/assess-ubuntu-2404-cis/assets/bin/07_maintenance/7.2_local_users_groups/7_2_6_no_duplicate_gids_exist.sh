#!/bin/bash

CRITICALITY=1
TITLE="Ensure no duplicate GIDs exist"

function check {
	STATUS="Pass"
	cat /etc/group | cut -f3 -d":" | sort -n | uniq -c | while read x ; do 
		[ -z "${x}" ] && break
		set - $x
		if [ $1 -gt 1 ]; then
			groups=`awk -F: '($3 == n) { print $1 }' n=$2 /etc/group | xargs`
			STATUS="Fail"
			return
			echo "Duplicate GID ($2): ${groups}"
		fi
	done
}

function fix {
    echo "Manual."
}
