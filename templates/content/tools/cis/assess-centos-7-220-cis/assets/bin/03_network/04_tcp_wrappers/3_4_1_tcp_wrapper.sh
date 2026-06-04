#!/bin/sh

CRITICALITY=1
TITLE="Ensure TCP Wrappers is installed"

function check {
	STATUS="Pass"

	rpm -q tcp_wrappers  &> /dev/null

	if [ $? != 0 ]; then
		STATUS="Fail"
	fi
}

function fix {
	#yum install -y tcp_wrappers
	echo "Manual"
}