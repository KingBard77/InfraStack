#!/bin/bash

CRITICALITY=1
TITLE="Ensure AppArmor is enabled in the bootloader configuration"

function check {
    STATUS="Fail"

    if grep "GRUB_CMDLINE_LINUX_DEFAULT.*apparmor=1.*security=apparmor" /etc/default/grub > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: apparmor not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
	cp -a /etc/default/grub /etc/default/grub.$(date +"%s")
	sed -i '/GRUB_CMDLINE_LINUX_DEFAULT/s/"$/ apparmor=1 security=apparmor"/' /etc/default/grub

    update-grub
}
