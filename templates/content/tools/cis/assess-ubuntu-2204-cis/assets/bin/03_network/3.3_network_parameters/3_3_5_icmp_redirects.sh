#!/bin/sh

CRITICALITY=1
TITLE="Ensure ICMP redirects are not accepted"

function check {
	sysctl net.ipv4.conf.all.accept_redirects | grep -E 0$ > /dev/null 2>&1

	if [ $? == 1 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv4.conf.default.accept_redirects | grep -E 0$ > /dev/null 2>&1
		if [ $? == 1 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.conf.all.accept_redirects = 0" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.accept_redirects = 0" >> /etc/sysctl.conf
	sysctl -p
}