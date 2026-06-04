#!/bin/sh

CRITICALITY=1
TITLE="Ensure chrony is configured"

function check {
	STATUS="Pass"

	#2>&1  > /dev/null

	grep "^server" /etc/chrony.conf > /dev/null 2>&1
	if [ $? != 0 ]; then
		STATUS="Fail"
	else
		grep "^OPTIONS" /etc/sysconfig/chronyd > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		fi
	fi
}

function fix {
	#sed -i '/^OPTIONS.*=/d' /etc/sysconfig/chronyd
	#echo 'OPTIONS="-u chrony"' >> /etc/sysconfig/chronyd
	echo "Manual"
}