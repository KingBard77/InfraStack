#!/bin/sh

CRITICALITY=1
TITLE="Ensure HTTP Proxy Server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled squid > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable squid
}