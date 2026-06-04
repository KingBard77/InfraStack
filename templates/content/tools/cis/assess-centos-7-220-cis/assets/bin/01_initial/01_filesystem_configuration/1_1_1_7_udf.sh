#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of udf filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v udf 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep udf  > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install udf /bin/true" >> /etc/modprobe.d/CIS.conf
}