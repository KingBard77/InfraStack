#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of FAT filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v vfat 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep vfat > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install vfat /bin/true" >> /etc/modprobe.d/CIS.conf
}