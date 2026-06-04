#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/shadow- are configured"

function check {
	STATUS="Fail"

	if [ -f /etc/shadow- ] ; then
		stat /etc/shadow- | grep Access | head -n1 | grep -E "0600.*0.*0.*root"  > /dev/null 2>&1

		if [ $? == 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	chown root:root /etc/shadow-
	chmod 600 /etc/shadow-
}