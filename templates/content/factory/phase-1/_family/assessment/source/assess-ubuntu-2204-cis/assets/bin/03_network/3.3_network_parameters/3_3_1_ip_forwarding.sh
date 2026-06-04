#!/bin/sh

CRITICALITY=2
TITLE="Ensure IP forwarding is disabled"

function check {
	STATUS="Fail"

	sysctl net.ipv4.ip_forward | grep -E 0$ > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi

    echo "Check status: $STATUS"
}

function fix {
	echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf 2>&1 /dev/null
	sysctl -p
}
