#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of jffs2 filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v jffs2 2>&1 | grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep jffs2  > /dev/null 

		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install jffs2 /bin/true" >> /etc/modprobe.d/CIS.conf
}