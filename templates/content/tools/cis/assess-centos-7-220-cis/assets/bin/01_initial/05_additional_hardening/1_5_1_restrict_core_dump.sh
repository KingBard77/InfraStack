#!/bin/sh

CRITICALITY=1
TITLE="Ensure core dumps are restricted"

function check {
	STATUS="Fail"

	if grep "hard core.*0" /etc/security/limits.conf /etc/security/limits.d/* 2>&1 > /dev/null; then
	        STATUS="Pass"
	fi
}

function fix {
	cp /etc/security/limits.d/100-mimos.conf /etc/security/limits.d/100-mimos.conf.$(date +"%s")
	sed -i '/^\*.*hard.*core/d' /etc/security/limits.conf
	echo "* hard core 0" >> /etc/security/limits.d/100-mimos.conf
}