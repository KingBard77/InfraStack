#!/bin/bash

CRITICALITY=1
TITLE="Ensure nodev option set on /dev/shm partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/dev/shm' | grep "nodev"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nodev is set on /dev/shm partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if cat /etc/fstab | grep /dev/shm | grep "nodev"; then
        echo "Options nodev on /dev/shm is already configured correctly."
    else
    	sudo sed -i "/\/dev\/shm/c\tmpfs\t/dev/shm\ttmpfs\tdefaults,rw,nosuid,nodev,noexec,relatime\t0 0" /etc/fstab

    	mount -o remount /dev/shm
    fi
}
