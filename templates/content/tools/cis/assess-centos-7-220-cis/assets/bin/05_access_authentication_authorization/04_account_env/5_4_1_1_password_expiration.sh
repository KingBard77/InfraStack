#!/bin/sh

CRITICALITY=1
TITLE="Ensure password expiration is 90 days or less"

function check {
	STATUS="Pass"

	if [ $(grep ^PASS_MAX_DAYS /etc/login.defs | awk '{ print $2 }') -le 90 ] ; then
		STATUS="Fail"
	fi

	for USER in `egrep ^[^:]+:[^\!*] /etc/shadow | cut -d: -f1`; do 
		if [ $(chage --list $USER | grep "Maximum.*change" | awk '{ print $9 }' ) -gt 90 ] ; then
			STATUS="Fail"
		fi
	done
}

function fix {
	sed -i '/^PASS_MAX_DAYS/d' /etc/login.defs
	echo "PASS_MAX_DAYS 90" >> /etc/login.defs
	chage --maxdays 90 oneadmin 
}
