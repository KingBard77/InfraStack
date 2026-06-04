#!/bin/sh

CRITICALITY=1
TITLE="Ensure DHCP Server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled dhcpd > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable dhcpd
}