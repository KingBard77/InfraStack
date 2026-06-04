#!/bin/sh

CRITICALITY=1
TITLE="Ensure SSH not using weak cipher"

function check {
	STATUS="Pass"
	GOOD_CIPHERS="aes256-ctr aes192-ctr aes128-ctr"

	if grep -e "^Ciphers" /etc/ssh/sshd_config > /dev/null 2>&1; then	
		CIPHERS=$(grep -e "^Ciphers" /etc/ssh/sshd_config | awk '{print $2}' | sed 's/\,/ /g')
		for i in $CIPHERS; do
			if ! echo $GOOD_CIPHERS | grep $i > /dev/null 2>&1; then
				STATUS="Fail"
			fi
		done
	else
	        STATUS="Fail"
	fi
}

function fix {
	sed -i '/^Ciphers\ /d' /etc/ssh/sshd_config
	echo "Ciphers aes256-ctr,aes192-ctr,aes128-ctr" >> /etc/ssh/sshd_config
}