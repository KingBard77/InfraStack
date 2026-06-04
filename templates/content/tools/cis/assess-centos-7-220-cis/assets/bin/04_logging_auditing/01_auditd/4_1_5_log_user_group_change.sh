#!/bin/sh

CRITICALITY=1
TITLE="Ensure events that modify user/group information are collected"

function check {
	STATUS="Fail"

	grep identity /etc/audit/audit.rules | grep -E "group|passwd|gshadow|shadow|opasswd"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /etc/group -p wa -k identity
-w /etc/passwd -p wa -k identity
-w /etc/gshadow -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/security/opasswd -p wa -k identity" >> /etc/audit/audit.rules
}