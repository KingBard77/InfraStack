#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH X11 Forwarding is disabled"

function check {
	STATUS="Fail"

	grep -e "^X11Forwarding no$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^X11Forwarding\ /d' /etc/ssh/sshd_config
	echo "X11Forwarding no" >> /etc/ssh/sshd_config
}