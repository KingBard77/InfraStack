#!/bin/bash

CRITICALITY=2
TITLE="Ensure sctp kernel module is not available"

function check {
	STATUS="Pass"

	lsmod | grep sctp > /dev/null

	if [ $? == 0 ]; then
		STATUS="Fail"
	fi

	echo "Check status: $STATUS"
}

function fix {
    echo "install sctp /bin/true" | tee -a /etc/modprobe.d/sctp.conf > /dev/null
}
