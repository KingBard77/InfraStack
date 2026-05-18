#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on /etc/ssh/sshd_config are configured"

function check {
	STATUS="Fail"

	stat /etc/ssh/sshd_config | grep -e "0600.*root.*root" > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	chown root:root /etc/ssh/sshd_config
	chmod og-rwx /etc/ssh/sshd_config
}
