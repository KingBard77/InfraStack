#!/bin/sh

CRITICALITY=1
TITLE="Ensure session initiation information is collected"

function check {
	STATUS="Fail"

	grep session /etc/audit/audit.rules | grep -E "utmp|wtmp|btmp" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /var/run/utmp -p wa -k session
-w /var/log/wtmp -p wa -k session
-w /var/log/btmp -p wa -k session" >> /etc/audit/audit.rules
}