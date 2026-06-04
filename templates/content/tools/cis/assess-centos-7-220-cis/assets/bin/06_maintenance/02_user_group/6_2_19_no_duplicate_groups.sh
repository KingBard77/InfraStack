#!/bin/bash

CRITICALITY=1
TITLE="Ensure no duplicate group names exist"

function check {
	STATUS="Pass"
	cat /etc/group | cut -f1 -d":" | sort -n | uniq -c | while read x ; do 
		[ -z "${x}" ] && break
		set - $x
		if [ $1 -gt 1 ]; then
			gids=`gawk -F: '($1 == n) { print $3 }' n=$2 /etc/group | xargs`
			STATUS="Fail"
			return
			echo "Duplicate Group Name ($2): ${gids}"
		fi
	done
}

function fix {
	echo "Manual";
}

