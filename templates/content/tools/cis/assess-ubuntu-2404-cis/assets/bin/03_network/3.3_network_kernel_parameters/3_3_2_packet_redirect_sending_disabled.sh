#!/bin/bash

CRITICALITY=1
TITLE="Ensure packet redirect sending is disabled"

function check {
	STATUS="Fail"

	sysctl net.ipv4.conf.all.send_redirects | grep -E 0$ > /dev/null 2>&1

	if [ $? == 0 ]; then
		sysctl net.ipv4.conf.default.send_redirects | grep -E 0$ > /dev/null 2>&1
		if [ $? == 0 ]; then
			STATUS="Pass"
		fi
	fi
	
    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.conf.all.send_redirects = 0" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.send_redirects = 0" >> /etc/sysctl.conf
	sysctl -p
}
