#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on bootloader config are configured"

function check {
	STATUS="Fail"

	stat /boot/grub2/grub.cfg | 2>&1 grep -E "Access.*0600.*root.*root"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	cp -a /boot/grub2/grub.cfg /boot/grub2/grub.cfg.$(date +"%s")
	chown root:root /boot/grub2/grub.cfg
	chmod og-rwx /boot/grub2/grub.cfg
}
