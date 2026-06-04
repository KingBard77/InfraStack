#!/bin/sh

CRITICALITY=1
TITLE="Ensure SNMP Server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled snmpd > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable snmpd
}