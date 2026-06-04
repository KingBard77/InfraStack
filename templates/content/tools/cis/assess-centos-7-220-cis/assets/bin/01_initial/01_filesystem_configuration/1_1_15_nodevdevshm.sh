#!/bin/sh

CRITICALITY=1
TITLE="Ensure nodev option set on /dev/shm partition"

function check {
	STATUS="Fail"

	mount | grep /dev/shm 2>&1 | grep -E "nodev"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/\/dev.shm\ /d' /etc/fstab
	echo "tmpfs /dev/shm tmpfs defaults,nodev,nosuid,noexec 0 0" >> /etc/fstab
}
