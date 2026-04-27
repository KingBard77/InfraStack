#!/bin/sh

CRITICALITY=1
TITLE="Ensure nosuid option set on /var/log partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/var/log' | grep "nosuid"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nosuid is set on /var/log partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if grep '/var/log' /etc/fstab | grep "nosuid" > /dev/null; then
        echo "Options nosuid on /var/log is already configured correctly."
    else
        sudo cp /etc/fstab /etc/fstab.backup.$(date +%s) 

        if grep -q '/var/log' /etc/fstab; then
            sudo sed -i "/ \/var\/log /c\<actual_device> /var/log <actual_fstype> defaults,rw,nosuid,nodev,noexec,relatime 0 0" /etc/fstab
        else
            echo "Manual"
        fi

    	mount -o remount /var/log
    fi
}
