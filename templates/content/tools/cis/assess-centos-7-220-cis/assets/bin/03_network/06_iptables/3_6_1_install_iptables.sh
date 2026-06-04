#!/bin/sh

CRITICALITY=1
TITLE="Ensure iptables is installed"

function check {
	STATUS="Fail"

	rpm -q iptables 2>&1  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"	
	fi
}

function fix {
	yum install -y iptables
}
