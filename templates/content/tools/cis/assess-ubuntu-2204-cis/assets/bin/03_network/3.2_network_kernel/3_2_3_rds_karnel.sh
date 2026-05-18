#!/bin/sh

CRITICALITY=1
TITLE="Ensure rds kernel module is not availablee"

function check {
	STATUS="Pass"

	lsmod | grep rds > /dev/null

	if [ $? == 0 ]; then
		STATUS="Fail"
	fi

	echo "Check status: $STATUS"
}

function fix {
    echo "install rds /bin/true" | tee -a /etc/modprobe.d/rds.conf > /dev/null
}
