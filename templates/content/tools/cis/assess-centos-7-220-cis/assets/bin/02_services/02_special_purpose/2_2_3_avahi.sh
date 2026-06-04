#!/bin/sh

CRITICALITY=1
TITLE="Ensure Avahi Server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled avahi-daemon > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable avahi-daemon
}