#!/bin/sh

CRITICALITY=1
TITLE="Ensure ownership and permission of crontab"

function check {
	STATUS="Fail"

	stat /etc/crontab | grep -e "0600.*root.*root" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/crontab
	chmod og-rwx /etc/crontab
}
