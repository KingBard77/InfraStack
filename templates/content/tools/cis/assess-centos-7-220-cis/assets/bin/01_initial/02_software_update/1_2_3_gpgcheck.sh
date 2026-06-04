#!/bin/sh

CRITICALITY=1
TITLE="Ensure gpgcheck is globally activated"

function check {
	STATUS="Fail"  

	grep ^gpgcheck /etc/yum.conf 2>&1 | grep -E "gpgcheck=1"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	cp -a /etc/yum.conf /etc/yum.conf.$(date +"%s")
	sed -i "s/^gpgcheck.*/gpgcheck=1/" /etc/yum.conf
}