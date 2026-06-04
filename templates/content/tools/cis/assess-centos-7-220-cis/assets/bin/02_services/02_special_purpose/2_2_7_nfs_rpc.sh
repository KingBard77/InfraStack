#!/bin/sh

CRITICALITY=1
TITLE="Ensure NFS and RPC are not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled nfs > /dev/null 2>&1 

	if [ $? != 0 ]; then
		systemctl is-enabled rpcbind > /dev/null 2>&1
		if [ $? != 0 ]; then	
			STATUS="Pass"
		fi
	fi
}

function fix {
	systemctl disable nfs
	systemctl disable rpcbind
}