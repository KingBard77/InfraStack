#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of hfsplus filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v hfsplus 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep hfsplus > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install hfsplus /bin/true" >> /etc/modprobe.d/CIS.conf
}