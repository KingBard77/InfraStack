#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH MaxAuthTries is less or equal to 4"

function check {
	STATUS="Fail"

	if grep -e "^MaxAuthTries" /etc/ssh/sshd_config > /dev/null 2>&1; then
		MAT_VAL=$(grep -e "^MaxAuthTries" /etc/ssh/sshd_config | awk '{print $2}')
		if [ $MAT_VAL -le 4 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	sed -i '/^MaxAuthTries\ /d' /etc/ssh/sshd_config
	echo "MaxAuthTries 4" >> /etc/ssh/sshd_config
}
