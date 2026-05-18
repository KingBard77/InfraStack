#!/bin/sh

CRITICALITY=1
TITLE="Ensure tcp syn Cookies is enabled"

function check {
	sysctl net.ipv4.tcp_syncookies | grep -E 1$ > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	else
		STATUS="Fail"
	fi
		
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.tcp_syncookies = 1" >> /etc/sysctl.conf
	sysctl -p
}

