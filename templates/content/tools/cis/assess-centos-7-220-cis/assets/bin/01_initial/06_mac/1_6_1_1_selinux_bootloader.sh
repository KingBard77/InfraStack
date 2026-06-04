#!/bin/sh

CRITICALITY=1
TITLE="Ensure SELinux is not disabled in bootloader configuration"

function check {
	STATUS="Pass"

	if grep "^\s*linux" /boot/grub2/grub.cfg | grep -E "selinux=0|enforcing=0" 2>&1 > /dev/null; then
	        STATUS="Fail"
	fi
}

function fix {
	sed -i -e s/"selinux\=0"//g -e s/"enforcing\=0"//g /etc/default/grub
	grub2-mkconfig > /boot/grub2/grub.cfg
}