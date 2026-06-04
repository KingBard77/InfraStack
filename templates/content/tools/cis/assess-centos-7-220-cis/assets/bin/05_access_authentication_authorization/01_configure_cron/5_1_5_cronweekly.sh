#!/bin/sh

CRITICALITY=1
TITLE="Ensure ownership and permission of cron weekly"

function check {
	STATUS="Fail"

	stat /etc/cron.weekly | grep -e "0600.*root.*root" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/cron.weekly
	chmod 0600 /etc/cron.weekly
}
