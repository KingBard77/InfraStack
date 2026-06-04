#!/bin/sh

CRITICALITY=1
TITLE="Ensure mail transfer agent is configured for local-only mode"

function check {
	STATUS="Pass"

	netstat -an | grep LIST | grep ":25[[:space:]]"  > /dev/null 2>&1 

	if [ $? == 0 ]; then
		netstat -an | grep LIST | grep -E "127.0.0.1:25|::1:25" > /dev/null 2>&1
		if [ $? != 0 ]; then
			STATUS="Fail"
		fi
	fi
}

function fix {
	sed -i '/^inet_interfaces.*=/d' /etc/postfix/main.cf
	echo "inet_interfaces = localhost" >> /etc/postfix/main.cf
	service postfix restart
}