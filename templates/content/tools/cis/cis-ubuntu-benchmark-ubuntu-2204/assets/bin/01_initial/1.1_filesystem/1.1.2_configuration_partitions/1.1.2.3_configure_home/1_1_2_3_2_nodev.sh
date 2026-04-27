#!/bin/sh

CRITICALITY=1
TITLE="Ensure nodev option set on /home partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/home' | grep "nodev"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nodev is set on /home partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if grep '/home' /etc/fstab | grep "nodev" > /dev/null; then
        echo "Options nodev on /home is already configured correctly."
    else
    	sudo cp /etc/fstab /etc/fstab.backup.$(date +%s)

        if grep -q '/home' /etc/fstab; then
    		sudo sed -i "/ \/home /c\<actual_device> /home <actual_fstype> defaults,rw,nosuid,nodev,noexec,relatime 0 0" /etc/fstab
        else
            echo "Manual"
        fi

    	mount -o remount /home
    fi
}
