#!/bin/bash

CRITICALITY=1
TITLE="Ensure reverse path filtering is enabled"

function check {
	sysctl net.ipv4.conf.all.rp_filter | grep -E 1$ > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv4.conf.default.rp_filter | grep -E 1$ > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.conf.all.rp_filter = 1" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.rp_filter = 1" >> /etc/sysctl.conf
	sysctl -p
}
