#!/bin/sh

CRITICALITY=1
TITLE="Ensure only approved MAC algorithms are used"

function check {
	STATUS="Pass"
	GOOD_ALGOS="hmac-sha2-512-etm@openssh.com hmac-sha2-256-etm@openssh.com umac-128-etm@openssh.com hmac-sha2-512 hmac-sha2-256 umac-128@openssh.com"

	if grep -e "^MACs" /etc/ssh/sshd_config > /dev/null 2>&1; then	
		ALGOS=$(grep -e "^MACs" /etc/ssh/sshd_config | awk '{print $2}' | sed 's/\ / /g')
		for i in $ALGOS; do
			if ! echo $GOOD_ALGOS | grep $i > /dev/null 2>&1; then
				STATUS="Fail"
			fi
		done
	else
	        STATUS="Fail"
	fi
}

function fix {
	sed -i '/^MACs\ /d' /etc/ssh/sshd_config
	echo "MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512,hmac-sha2-256,umac-128@openssh.com" >> /etc/ssh/sshd_config
}