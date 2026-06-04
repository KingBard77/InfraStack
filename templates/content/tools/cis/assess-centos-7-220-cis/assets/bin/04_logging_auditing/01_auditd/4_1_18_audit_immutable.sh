#!/bin/sh

CRITICALITY=1
TITLE="Ensure kernel module loading and unloading is collected"

function check {
	STATUS="Fail"

	grep "^\s*[^#]" /etc/audit/audit.rules | tail -1 | grep -E "-e 2"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-e 2" >> /etc/audit/audit.rules
}