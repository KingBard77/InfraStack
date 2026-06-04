#!/bin/sh

CRITICALITY=1
TITLE="Ensure no legacy + entries exist in /etc/shadow"

function check {
	STATUS="Fail"

	grep '^+:' /etc/shadow

	if [ $?  != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/^+:/d' /etc/shadow
}