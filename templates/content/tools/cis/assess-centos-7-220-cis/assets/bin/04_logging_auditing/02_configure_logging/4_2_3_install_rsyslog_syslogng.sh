#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsyslog or syslog-ng is installed"

function check {
	STATUS="Pass"

	rpm -q rsyslog > /dev/null 2>&1

	if [ $? != 0 ]; then
		syslog-ng > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		fi
	fi
}

function fix {
	yum install -y rsyslog
	#yum install syslog-ng
}