#!/bin/sh

CRITICALITY=1
TITLE="Ensure /etc/hosts.allow is configured with 0644 permission"

function check {
	STATUS="Fail"

	if [ $(stat -c %a /etc/hosts.allow) -eq "644" ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/hosts.allow
	chmod 644 /etc/hosts.allow
}