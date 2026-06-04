#!/bin/bash

CRITICALITY=2
TITLE="Ensure dccp kernel module is not available"

function check {
	STATUS="Pass"

	lsmod | grep dccp > /dev/null

	if [ $? == 0 ]; then
		STATUS="Fail"
	fi

	echo "Check status: $STATUS"
}

function fix {
    echo "install dccp /bin/true" | tee -a /etc/modprobe.d/dccp.conf > /dev/null
}
