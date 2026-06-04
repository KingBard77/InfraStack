#!/bin/sh

CRITICALITY=1
TITLE="Ensure events that modify the system's Mandatory Access Controls are collected"

function check {
	STATUS="Fail"

	grep MAC-policy /etc/audit/audit.rules | grep selinux  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /etc/selinux/ -p wa -k MAC-policy" >> /etc/audit/audit.rules
}