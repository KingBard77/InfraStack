#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH warning banner is configured"

function check {
	STATUS="Fail"

	if (grep -e "^Banner" /etc/ssh/sshd_config > /dev/null 2>&1); then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/^Banner\ /d' /etc/ssh/sshd_config
	echo "Banner /etc/issue.net" >> /etc/ssh/sshd_config
}
