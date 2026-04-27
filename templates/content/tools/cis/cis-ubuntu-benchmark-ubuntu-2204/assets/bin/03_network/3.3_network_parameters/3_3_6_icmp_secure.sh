#!/bin/sh

CRITICALITY=1
TITLE="Ensure secure ICMP redirects are not accepted"

function check {
	sysctl net.ipv4.conf.all.secure_redirects | grep -E 0$ > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv4.conf.default.secure_redirects | grep -E 0$ > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.conf.all.secure_redirects = 0" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.secure_redirects = 0" >> /etc/sysctl.conf
	sysctl -p
}