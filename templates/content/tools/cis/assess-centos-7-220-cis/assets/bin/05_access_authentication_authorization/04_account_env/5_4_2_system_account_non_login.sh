#!/bin/sh

CRITICALITY=1
TITLE="Ensure system accounts are non-login"

function check {
	STATUS="Fail"

	if [ $(egrep -v "^\+" /etc/passwd | awk -F: '($1!="root" && $1!="sync" && $1!="shutdown" && $1!="halt" && $3<1000 && $7!="/sbin/nologin" && $7!="/bin/false") {print}' | wc -l ) == 0 ] ; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}
