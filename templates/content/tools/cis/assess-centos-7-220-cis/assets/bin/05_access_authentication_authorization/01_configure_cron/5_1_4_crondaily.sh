#!/bin/sh

CRITICALITY=1
TITLE="Ensure ownership and permission of cron daily"

function check {
	STATUS="Fail"

	stat /etc/cron.daily | grep -e "0600.*root.*root" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/cron.daily
	chmod 600 /etc/cron.daily
}
