#!/bin/sh

CRITICALITY=1
TITLE="Ensure nosuid option set on /dev/shm partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/dev/shm' | grep "nosuid"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nosuid is set on /dev/shm partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if cat /etc/fstab | grep /dev/shm | grep "nosuid"; then
        echo "Options nosuid on /dev/shm is already configured correctly."
    else
    	sudo sed -i "/\/dev\/shm/c\tmpfs\t/dev/shm\ttmpfs\tdefaults,rw,nosuid,nodev,noexec,relatime\t0 0" /etc/fstab

    	mount -o remount /dev/shm
    fi
}
