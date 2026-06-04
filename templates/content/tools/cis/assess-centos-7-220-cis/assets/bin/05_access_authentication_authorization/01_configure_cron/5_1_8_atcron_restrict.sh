#!/bin/sh

CRITICALITY=1
TITLE="Ensure at/cron is restricted to authorized users"

function check {
	STATUS="Fail"

	if !(stat /etc/at.allow > /dev/null 2>&1); then
		if !(stat /etc/cron.allow > /dev/null 2>&1); then
			STATUS="Pass"
		elif stat /etc/cron.allow | grep -e "0600.*root.*root" > /dev/null 2>&1 ; then
			STATUS="Pass"
		fi
	elif stat /etc/at.allow | grep -e "0600.*root.*root" > /dev/null 2>&1 ; then
		if !(stat /etc/cron.allow > /dev/null 2>&1); then
			STATUS="Pass"
		elif stat /etc/cron.allow | grep -e "0600.*root.*root" > /dev/null 2>&1 ; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	rm /etc/cron.deny
	rm /etc/at.deny
	touch /etc/cron.allow
	touch /etc/at.allow
	chmod og-rwx /etc/cron.allow
	chmod og-rwx /etc/at.allow
	chown root:root /etc/cron.allow
	chown root:root /etc/at.allow
}
