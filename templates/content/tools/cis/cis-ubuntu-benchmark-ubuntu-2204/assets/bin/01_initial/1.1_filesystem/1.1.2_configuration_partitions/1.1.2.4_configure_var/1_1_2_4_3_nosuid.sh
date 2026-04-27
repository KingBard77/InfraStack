#!/bin/sh

CRITICALITY=1
TITLE="Ensure nosuid option set on /var partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/var' | grep "nosuid"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nosuid is set on /var partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if grep '/var' /etc/fstab | grep "nosuid" > /dev/null; then
        echo "Options nosuid on /var is already configured correctly."
    else
    	sudo cp /etc/fstab /etc/fstab.backup.$(date +%s)

        if grep -q '/var' /etc/fstab; then
    		sudo sed -i "/ \/var /c\<actual_device> /var <actual_fstype> defaults,rw,nosuid,nodev,noexec,relatime 0 0" /etc/fstab
        else
            echo "Manual"
        fi

    	mount -o remount /var
    fi
}