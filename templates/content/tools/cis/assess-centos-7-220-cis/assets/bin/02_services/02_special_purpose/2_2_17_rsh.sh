#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsh server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled rsh.socket > /dev/null 2>&1

	if [ $? != 0 ]; then
		systemctl is-enabled rlogin.socket > /dev/null 2>&1
		if [ $? != 0 ]; then
			systemctl is-enabled rexec.socket > /dev/null 2>&1
			if [ $? != 0 ]; then
				STATUS="Pass"
			fi
		fi
	fi
}

function fix {
	systemctl disable rsh.socket
	systemctl disable rlogin.socket
	systemctl disable rexec.socket
}