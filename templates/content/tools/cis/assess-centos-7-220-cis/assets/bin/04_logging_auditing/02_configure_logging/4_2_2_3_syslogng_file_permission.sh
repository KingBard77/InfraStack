#!/bin/sh

CRITICALITY=1
TITLE="Ensure syslog-ng default file permissions configured"

function check {
	STATUS="Fail"

	grep ^options /etc/syslog-ng/syslog-ng.conf 2>&1 | grep 0640  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}