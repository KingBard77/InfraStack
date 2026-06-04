#!/bin/sh

CRITICALITY=1
TITLE="Ensure file deletion events by users are collected"

function check {
	STATUS="Fail"

	grep delete /etc/audit/audit.rules | grep "auid>=1000" | grep "always,exit" | grep "auid!=4294967295" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-a always,exit -F arch=b64 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete
-a always,exit -F arch=b32 -S unlink -S unlinkat -S rename -S renameat -F auid>=1000 -F auid!=4294967295 -k delete" >> /etc/audit/audit.rules
}
