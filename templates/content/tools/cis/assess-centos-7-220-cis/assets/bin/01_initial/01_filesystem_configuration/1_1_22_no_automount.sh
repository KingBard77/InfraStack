#!/bin/sh

CRITICALITY=1
TITLE="Disable Automounting"

function check {
	STATUS="Fail"

	systemctl is-enabled autofs > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable autofs
}
