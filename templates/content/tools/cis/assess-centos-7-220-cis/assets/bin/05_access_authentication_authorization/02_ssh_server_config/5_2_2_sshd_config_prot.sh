#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH Protocol is set to 2"

function check {
	STATUS="Fail"

	grep -e "^Protocol 2$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^Protocol\ /d' /etc/ssh/sshd_config
	echo "Protocol 2" >> /etc/ssh/sshd_config
}
