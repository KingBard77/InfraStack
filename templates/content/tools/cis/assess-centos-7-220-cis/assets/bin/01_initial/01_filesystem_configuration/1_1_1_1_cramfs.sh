#!/bin/sh

CRITICALITY=1
TITLE="Ensure mounting of cramfs filesystems is disabled"

function check {
	STATUS="Fail"

	modprobe -n -v cramfs | 2>&1 grep -E "install"  > /dev/null 

	if [ $? == 0 ]; then
		lsmod 2>&1 | grep cramfs > /dev/null 
   
		if [ $? != 0 ]; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	echo "install cramfs /bin/true" >> /etc/modprobe.d/CIS.conf
}