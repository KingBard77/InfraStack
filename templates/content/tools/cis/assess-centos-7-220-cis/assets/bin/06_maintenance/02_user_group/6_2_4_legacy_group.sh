#!/bin/sh

CRITICALITY=1
TITLE="Ensure no legacy + entries exist in /etc/group"

function check {
	STATUS="Fail"

	grep '^+:' /etc/group

	if [ $?  != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/^+:/d' /etc/group
}