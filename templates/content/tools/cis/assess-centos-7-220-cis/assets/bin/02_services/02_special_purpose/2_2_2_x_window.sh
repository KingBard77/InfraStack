#!/bin/sh

CRITICALITY=1
TITLE="Ensure X Window System is not installed"

function check {
	STATUS="Fail"

	rpm -qa xorg-x11* | wc -l > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	yum remove xorg-x11*
}