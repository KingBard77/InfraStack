#!/bin/sh

CRITICALITY=1
TITLE="Ensure minimum days between password changes is 7 or more"

function check {
	STATUS="Pass"

	if [ $(grep ^PASS_MIN_DAYS /etc/login.defs | awk '{ print $2 }') -lt 7 ] ; then
		STATUS="Fail"
	fi

	for USER in `egrep ^[^:]+:[^\!*] /etc/shadow | cut -d: -f1`; do 
		if [ $(chage --list $USER | grep "Minimum.*change" | awk '{ print $9 }' ) -lt 7 ] ; then
			STATUS="Fail"
		fi
	done
}

function fix {
	sed -i '/^PASS_MIN_DAYS/d' /etc/login.defs
	echo "PASS_MIN_DAYS 7" >> /etc/login.defs
}
