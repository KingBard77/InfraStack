#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/passwd are configured"

function check {
	STATUS="Fail"

	stat /etc/passwd | grep Access | head -n1 | grep -E "0644.*0.*0.*root"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/passwd
	chmod 644 /etc/passwd
}