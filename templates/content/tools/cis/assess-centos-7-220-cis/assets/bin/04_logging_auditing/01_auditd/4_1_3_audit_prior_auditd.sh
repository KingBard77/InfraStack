#!/bin/sh

CRITICALITY=1
TITLE="Ensure auditing for processes that start prior to auditd is enabled"

function check {
	STATUS="Fail"

	grep "^\s*linux" /boot/grub2/grub.cfg | grep audit  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
TEXT=$(grep GRUB_CMDLINE_LINUX /etc/default/grub); echo $TEXT | sed s/\"$/\ audit=1\"/g
TEXT=$(grep GRUB_CMDLINE_LINUX /etc/default/grub); AUDITED=$(echo $TEXT | sed s/\"$/\ audit=1\"/g); sed s/GRUB_CMDLINE_LINUX.*/'$AUDITED'/g grub
#TEXT=$(grep GRUB_CMDLINE_LINUX /etc/default/grub); sed -i'' s/GRUB_CMDLINE_LINUX.*/$(echo $TEXT | sed s/\"$/\ audit=1\"/g)/g /etc/default/grub
}