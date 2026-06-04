#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/group- are configured"

function check {
	STATUS="Fail"

	if [ -f /etc/group- ] ; then
		stat /etc/group- | grep Access | head -n1 | grep -E "0600.*0.*0.*root"  > /dev/null 2>&1

		if [ $? == 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	chown root:root /etc/group-
	chmod 600 /etc/group-
}