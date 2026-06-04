#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH Idle Timeout Interval is configured"

function check {
	STATUS="Fail"

	if grep -e "^ClientAliveInterval" /etc/ssh/sshd_config > /dev/null 2>&1; then
		CAI_VAL=$(grep -e "^ClientAliveInterval" /etc/ssh/sshd_config | awk '{print $2}')
	else CAI_VAL=0
	fi

	if grep -e "^ClientAliveCountMax" /etc/ssh/sshd_config > /dev/null 2>&1; then
		CACM_VAL=$(grep -e "^ClientAliveCountMax" /etc/ssh/sshd_config | awk '{print $2}')
	else CACM_VAL=999
	fi

	if [ $CAI_VAL -ge 300 ] && [ $CACM_VAL -eq 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/^ClientAliveInterval\ /d' /etc/ssh/sshd_config
	echo "ClientAliveInterval 300" >> /etc/ssh/sshd_config
	sed -i '/^ClientAliveCountMax\ /d' /etc/ssh/sshd_config
	echo "ClientAliveCountMax 0" >> /etc/ssh/sshd_config
}
