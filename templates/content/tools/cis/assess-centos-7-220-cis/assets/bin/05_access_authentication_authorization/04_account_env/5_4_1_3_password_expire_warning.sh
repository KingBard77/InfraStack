#!/bin/sh

CRITICALITY=1
TITLE="Ensure password expiration warning days is 7 or more"

function check {
	STATUS="Pass"

	if [ $(grep ^PASS_WARN_AGE /etc/login.defs | awk '{ print $2 }') -lt 7 ] ; then
		STATUS="Fail"
	fi

	for USER in `egrep ^[^:]+:[^\!*] /etc/shadow | cut -d: -f1`; do 
		if [ $(chage --list $USER | grep "warning.*expires" | awk '{ print $10 }' ) -lt 7 ] ; then
			STATUS="Fail"
		fi
	done
}

function fix {
	sed -i '/^PASS_WARN_AGE/d' /etc/login.defs
	echo "PASS_WARN_AGE 7" >> /etc/login.defs
}
