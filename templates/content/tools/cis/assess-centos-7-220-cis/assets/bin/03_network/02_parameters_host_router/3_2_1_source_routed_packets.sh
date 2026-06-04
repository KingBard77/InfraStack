#!/bin/sh

CRITICALITY=1
TITLE="Ensure source routed packets are not accepted"

function check {
	sysctl net.ipv4.conf.all.accept_source_route | grep -E 0$ > /dev/null 2>&1

	if [ $? == 1 ]; then
		STATUS="Fail"
	else
		sysctl net.ipv4.conf.default.accept_source_route | grep -E 0$ > /dev/null 2>&1
		if [ $? == 1 ]; then
			STATUS="Fail"
		else
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "net.ipv4.conf.all.accept_source_route = 0" >> /etc/sysctl.conf
	echo "net.ipv4.conf.default.accept_source_route = 0" >> /etc/sysctl.conf
	sysctl -p
}