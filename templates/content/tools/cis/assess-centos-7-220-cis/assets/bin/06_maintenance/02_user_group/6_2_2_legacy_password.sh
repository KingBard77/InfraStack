#!/bin/sh

CRITICALITY=1
TITLE="Ensure no legacy + entries exist in /etc/passwd"

function check {
	STATUS="Fail"

	grep '^+:' /etc/passwd

	if [ $?  != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/^+:/d' /etc/passwd
}