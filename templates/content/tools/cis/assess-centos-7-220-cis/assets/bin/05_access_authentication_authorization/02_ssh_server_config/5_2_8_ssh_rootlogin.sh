#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH PermitRootLogin is disabled"

function check {
	STATUS="Fail"

	grep -e "^PermitRootLogin no$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^PermitRootLogin\ /d' /etc/ssh/sshd_config
	echo "PermitRootLogin no" >> /etc/ssh/sshd_config
	#echo "Manual"
}
