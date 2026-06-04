#!/bin/sh

CRITICALITY=1
TITLE="Ensure IPv6 is disabled"

function check {
	sysctl net.ipv6.conf.all.disable_ipv6 | grep -E 0$ > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		STATUS="Pass"
	fi
}

function fix {
	echo "net.ipv6.conf.all.disable_ipv6 = 1" >> /etc/sysctl.conf
	sysctl -p
}
