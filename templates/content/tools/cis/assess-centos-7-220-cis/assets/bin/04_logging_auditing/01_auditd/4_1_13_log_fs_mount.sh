#!/bin/sh

CRITICALITY=1
TITLE="Ensure successful file system mounts are collected"

function check {
	STATUS="Fail"

	grep mounts /etc/audit/audit.rules | grep "auid>=1000" | grep "always,exit" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts
-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=4294967295 -k mounts" >> /etc/audit/audit.rules
}