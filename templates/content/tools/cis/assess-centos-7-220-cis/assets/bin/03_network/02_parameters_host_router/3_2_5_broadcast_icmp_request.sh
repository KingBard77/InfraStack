#!/bin/sh

CRITICALITY=1
TITLE="Ensure broadcast ICMP redirects are ignored"

function check {
	sysctl net.ipv4.icmp_echo_ignore_broadcasts | grep -E 1$ > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	else
	        STATUS="Fail"
	fi
}

function fix {
	echo "net.ipv4.icmp_echo_ignore_broadcasts = 1" >> /etc/sysctl.conf
	sysctl -p
}

