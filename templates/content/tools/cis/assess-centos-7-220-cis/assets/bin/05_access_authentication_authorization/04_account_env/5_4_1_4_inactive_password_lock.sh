#!/bin/sh

CRITICALITY=1
TITLE="Ensure inactive password lock is 30 days or less"

function check {
	STATUS="Pass"

	if [ $(useradd -D | grep INACTIVE | cut -d= -f2) -gt 30 ] ; then
		STATUS="Fail"
	fi

	if [ $(useradd -D | grep INACTIVE | cut -d= -f2) -lt 0 ] ; then
		STATUS="Fail"
	fi

	for USER in `egrep ^[^:]+:[^\!*] /etc/shadow | cut -d: -f1`; do 
		if [ $(chage --list root | grep inactive | awk '{ print $4 }' ) == "never" ] ; then
			STATUS="Fail"
		fi
	done
}

function fix {
	#useradd -D -f 30
	echo "Manual"
}
