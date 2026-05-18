#!/bin/sh

CRITICALITY=1
TITLE="Ensure sshd Banner is configured"

function check {
	STATUS="Fail"

	if (grep -e "^AllowUsers" /etc/ssh/sshd_config > /dev/null 2>&1) && \
	   (grep -e "^AllowGroups" /etc/ssh/sshd_config > /dev/null 2>&1) && \
	   (grep -e "^DenyUsers" /etc/ssh/sshd_config > /dev/null 2>&1) && \
	   (grep -e "^DenyGroups" /etc/ssh/sshd_config > /dev/null 2>&1); then
		STATUS="Pass"
	fi
}

function fix {
	echo "Manual"
}
