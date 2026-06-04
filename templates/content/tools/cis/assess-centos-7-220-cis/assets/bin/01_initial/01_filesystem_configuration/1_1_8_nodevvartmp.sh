#!/bin/sh

CRITICALITY=1
TITLE="Ensure separate partition exists for /var/tmp"

function check {
	STATUS="Fail"

	mount | grep /var/tmp 2>&1 | grep -E "nodev"  > /dev/null 

	if [ $? == 0 ]; then
	        STATUS="Pass"
	fi
}

function fix {
	sed -i '/\/var.tmp\ /d' /etc/fstab
	echo "tmpfs /var/tmp tmpfs rw,nosuid,nodev,noexec,relatime 0 0" >> /etc/fstab
}