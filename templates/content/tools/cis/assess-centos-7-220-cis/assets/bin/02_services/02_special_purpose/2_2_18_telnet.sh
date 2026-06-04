#!/bin/sh

CRITICALITY=1
TITLE="Ensure telnet server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled telnet.socket > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable telnet.socket
}