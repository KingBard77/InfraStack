#!/bin/sh

CRITICALITY=1
TITLE="Ensure login and logout events are collected"

function check {
	STATUS="Fail"

	grep logins /etc/audit/audit.rules | grep -E "lastlog|faillock" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /var/log/lastlog -p wa -k logins
-w /var/run/faillock/ -p wa -k logins" >> /etc/audit/audit.rules
}