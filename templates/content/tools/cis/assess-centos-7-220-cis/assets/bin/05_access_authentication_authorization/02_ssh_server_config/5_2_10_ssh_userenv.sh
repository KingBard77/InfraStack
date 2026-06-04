#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH PermitUserEnvironment is disabled"

function check {
	STATUS="Fail"

	grep -e "^PermitUserEnvironment no$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^PermitUserEnvironment\ /d' /etc/ssh/sshd_config
	echo "PermitUserEnvironment no" >> /etc/ssh/sshd_config
}
