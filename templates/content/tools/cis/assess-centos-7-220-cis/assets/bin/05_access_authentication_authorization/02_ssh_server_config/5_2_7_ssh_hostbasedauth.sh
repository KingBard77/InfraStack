#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH HostbasedAuthentication is disabled"

function check {
	STATUS="Fail"

	grep -e "^HostbasedAuthentication no$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^HostbasedAuthentication\ /d' /etc/ssh/sshd_config
	echo "HostbasedAuthentication no" >> /etc/ssh/sshd_config
}
