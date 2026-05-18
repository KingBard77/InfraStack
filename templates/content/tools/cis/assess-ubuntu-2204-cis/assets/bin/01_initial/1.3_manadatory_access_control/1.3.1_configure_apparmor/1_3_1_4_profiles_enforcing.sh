#!/bin/bash

CRITICALITY=1
TITLE="Ensure all AppArmor Profiles are enforcing"

function check {
    STATUS="Fail"

	# apparmor_status | grep -E "profiles are in (enforce|complain) mode|processes are unconfined"
	
	if apparmor_status | grep profiles.*defined && apparmor_status | grep processes.*unconfined > /dev/null 2>&1; then
		STATUS="Pass"
	else
        STATUS="Fail: apparmor are not in enfore or complain mode"
    fi

    echo "Check status: $STATUS"
}


function fix {
	# aa-enforce /etc/apparmor.d/*
	# aa-complain /etc/apparmor.d/*
	echo "Manual."
}
