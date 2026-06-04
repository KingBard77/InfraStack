#!/bin/sh

CRITICALITY=1
TITLE="Ensure kernel module loading and unloading is collected"

function check {
	STATUS="Fail"

	grep actions /etc/audit/audit.rules | grep -E "insmod|rmmod|modprobe" | grep -E "always,exit"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /sbin/insmod -p x -k modules
-w /sbin/rmmod -p x -k modules
-w /sbin/modprobe -p x -k modules
-a always,exit arch=b64 -S init_module -S delete_module -k modules" >> /etc/audit/audit.rules
}