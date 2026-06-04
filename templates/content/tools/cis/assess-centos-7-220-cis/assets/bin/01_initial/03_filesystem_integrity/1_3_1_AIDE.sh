#!/bin/sh

CRITICALITY=1
TITLE="Ensure AIDE is installed"

function check {
	STATUS="Fail"
	
	rpm -q aide 2>&1 | grep -E "aide-"  &> /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	yum install -y -q aide
	aide --init
	cp -a /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.new.gz.$(date +"%s")
	mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz
}
