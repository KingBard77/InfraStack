#!/bin/sh

CRITICALITY=1
TITLE="Ensure tipc kernel module is not availablee"

function check {
	STATUS="Pass"

	lsmod | grep tipc > /dev/null

	if [ $? == 0 ]; then
		STATUS="Fail"
	fi

	echo "Check status: $STATUS"
}

function fix {
    echo "install tipc /bin/true" | tee -a /etc/modprobe.d/tipc.conf > /dev/null
}