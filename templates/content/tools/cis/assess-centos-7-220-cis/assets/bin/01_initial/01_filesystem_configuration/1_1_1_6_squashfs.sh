#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of squashfs filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v squashfs 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep squashfs > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install squashfs /bin/true" >> /etc/modprobe.d/CIS.conf
}