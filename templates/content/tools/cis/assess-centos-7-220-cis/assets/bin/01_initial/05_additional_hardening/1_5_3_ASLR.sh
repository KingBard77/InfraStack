#!/bin/sh

CRITICALITY=1
TITLE="Ensure address space layout randomization (ASLR) is enabled"

function check {
	STATUS="Fail"

	sysctl kernel.randomize_va_space 2>&1 | grep -E "kernel.randomize_va_space = 2"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "kernel.randomize_va_space = 2" >> /etc/sysctl.conf
	sysctl -w kernel.randomize_va_space=2
}