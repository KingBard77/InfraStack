#!/bin/sh

CRITICALITY=1
TITLE="Ensure IPv6 redirects are not accepted"

function check {
	sysctl net.ipv6.conf.all.accept_redirects | grep -E 0$ > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv6.conf.default.accept_redirects | grep -E 0$ > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "net.ipv6.conf.all.accept_redirects = 0" >> /etc/sysctl.conf
	echo "net.ipv6.conf.default.accept_redirects = 0"  >> /etc/sysctl.conf
	sysctl -p
}