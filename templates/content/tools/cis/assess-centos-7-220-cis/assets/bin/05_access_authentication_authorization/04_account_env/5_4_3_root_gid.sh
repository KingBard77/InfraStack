#!/bin/sh

CRITICALITY=1
TITLE="Ensure default group for the root account is GID 0"

function check {
	STATUS="Fail"

	if [ $(grep "^root:" /etc/passwd | cut -f4 -d: ) == 0 ] ; then
		STATUS="Pass"
	fi
}

function fix {
	usermod -g 0 root
}
