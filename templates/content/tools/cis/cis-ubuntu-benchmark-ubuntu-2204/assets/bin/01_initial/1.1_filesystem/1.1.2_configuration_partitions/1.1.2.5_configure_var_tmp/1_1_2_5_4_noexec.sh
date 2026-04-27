#!/bin/sh

CRITICALITY=1
TITLE="Ensure noexec option set on /var/tmp partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/var/tmp' | grep "noexec"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set noexec is set on /var/tmp partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if grep '/var/tmp' /etc/fstab | grep "noexec" > /dev/null; then
        echo "Options noexec on /var/tmp is already configured correctly."
    else
        sudo cp /etc/fstab /etc/fstab.backup.$(date +%s) 

        if grep -q '/var/tmp' /etc/fstab; then
            sudo sed -i "/ \/var\/tmp /c\<actual_device> /var/tmp <actual_fstype> defaults,rw,nosuid,nodev,noexec,relatime 0 0" /etc/fstab
        else
            echo "Manual"
        fi

    	mount -o remount /var/tmp
    fi
}
