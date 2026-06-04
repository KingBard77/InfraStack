#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH LoginGraceTime is set to one minute or less"

function check {
	STATUS="Fail"

	if grep -e "^LoginGraceTime" /etc/ssh/sshd_config > /dev/null 2>&1; then
		LGT_VAL=$(grep -e "^LoginGraceTime" /etc/ssh/sshd_config | awk '{print $2}')
		if [ $LGT_VAL -le 60 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	sed -i '/^LoginGraceTime\ /d' /etc/ssh/sshd_config
	echo "LoginGraceTime 60" >> /etc/ssh/sshd_config
}
