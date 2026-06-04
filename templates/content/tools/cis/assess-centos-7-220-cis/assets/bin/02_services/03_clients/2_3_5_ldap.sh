#!/bin/sh

CRITICALITY=1
TITLE="Ensure LDAP client is not installed"

function check {
	STATUS="Fail"

	rpm -q openldap-clients 2>&1  > /dev/null 

	if [ $? != 0 ]; then
		STATUS="Pass"	
	fi
}

function fix {
	yum remove openldap-clients
}
