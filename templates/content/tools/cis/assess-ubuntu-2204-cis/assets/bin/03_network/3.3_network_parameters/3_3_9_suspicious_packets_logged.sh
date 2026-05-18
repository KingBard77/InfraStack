#!/bin/sh

CRITICALITY=1
TITLE="Ensure suspicious packets are logged"

function check {
	sysctl net.ipv4.conf.all.log_martians 2>&1 | grep -E 1$ > /dev/null

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv4.conf.default.log_martians 2>&1 | grep -E 1$ > /dev/null
		if [ $? != 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.conf.all.log_martians = 1" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.log_martians = 1" >> /etc/sysctl.conf
	sysctl -p
}