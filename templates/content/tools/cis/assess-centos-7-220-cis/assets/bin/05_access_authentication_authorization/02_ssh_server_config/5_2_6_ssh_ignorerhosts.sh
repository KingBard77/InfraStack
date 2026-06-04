#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH IgnoreRhosts is enable"

function check {
	STATUS="Fail"

	grep -e "^IgnoreRhosts yes$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^IgnoreRhosts\ /d' /etc/ssh/sshd_config
	echo "IgnoreRhosts yes" >> /etc/ssh/sshd_config
}