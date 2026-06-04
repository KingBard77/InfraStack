#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH Log Level is set to INFO"

function check {
	STATUS="Fail"

	grep -e "^LogLevel INFO$" /etc/ssh/sshd_config > /dev/null 2>&1

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^LogLevel\ /d' /etc/ssh/sshd_config
	echo "LogLevel INFO" >> /etc/ssh/sshd_config
}
