#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH PermitEmptyPasswords is disabled"

function check {
	STATUS="Fail"

	grep -e "^PermitEmptyPasswords no$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^PermitEmptyPasswords\ /d' /etc/ssh/sshd_config
	echo "PermitEmptyPasswords no" >> /etc/ssh/sshd_config
}
