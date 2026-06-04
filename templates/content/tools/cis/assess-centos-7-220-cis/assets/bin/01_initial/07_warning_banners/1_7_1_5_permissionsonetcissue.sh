#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/issue are configured"

function check {
	STATUS="Fail"

	stat /etc/issue | 2>&1 grep -E "644"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/issue
	chmod 644 /etc/issue
}