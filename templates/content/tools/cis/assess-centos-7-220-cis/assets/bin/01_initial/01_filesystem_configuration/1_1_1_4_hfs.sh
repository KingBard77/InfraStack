#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of hfs filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v hfs 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep hfs  > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install hfs /bin/true" >> /etc/modprobe.d/CIS.conf
}