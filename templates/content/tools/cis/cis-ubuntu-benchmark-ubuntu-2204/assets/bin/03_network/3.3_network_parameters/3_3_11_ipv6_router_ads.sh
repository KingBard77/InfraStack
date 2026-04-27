#!/bin/sh

CRITICALITY=1
TITLE="Ensure IPv6 router advertisements are not accepted"

function check {
	sysctl net.ipv6.conf.all.accept_ra | grep -E 0$ > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv6.conf.default.accept_ra | grep -E 0$ > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv6.conf.all.accept_ra = 0" >> /etc/sysctl.conf
	echo "net.ipv6.conf.default.accept_ra = 0"  >> /etc/sysctl.conf
	sysctl -p
}
