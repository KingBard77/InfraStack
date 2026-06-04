#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on all logfiles are configured"

function check {
	STATUS="Fail"

	find /var/log -type f -ls | awk '{ print $3 }' | grep -E -v "\-\-\-$"  > /dev/null 2>&1

	if [ $? != 0 ]; then
		find /var/log -type f -ls | awk '{ print $3 }' | grep -E -v "\-\-...$"  > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	find /var/log -type f -exec chmod g-wx,o-rwx {} +
}