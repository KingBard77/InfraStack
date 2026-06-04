#!/bin/sh

CRITICALITY=1
TITLE="Ensure rsyslog default file permissions configured"

function check {
	STATUS="Fail"

	grep ^\$FileCreateMode /etc/rsyslog.conf | grep "0640" > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	sed -i '/^\$FileCreateMode/d' /etc/rsyslog.conf
	echo '$FileCreateMode 0640' >> /etc/rsyslog.conf
}