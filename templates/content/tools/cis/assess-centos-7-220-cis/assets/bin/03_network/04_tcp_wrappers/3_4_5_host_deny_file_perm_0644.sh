#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/hosts.deny are 644"

function check {
	STATUS="Fail"

	if [ $(stat -c %a /etc/hosts.deny) -eq "644" ]; then
		STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/hosts.deny
	chmod 644 /etc/hosts.deny
}
