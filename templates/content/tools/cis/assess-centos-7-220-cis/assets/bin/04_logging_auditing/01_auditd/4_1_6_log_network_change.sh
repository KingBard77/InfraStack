#!/bin/sh

CRITICALITY=1
TITLE="Ensure events that modify the system's network environment are collected"

function check {
	STATUS="Fail"

	grep system-locale /etc/audit/audit.rules | grep -E "sethostname|issue|issue.net|hosts|sysconfig.network"  > /dev/null 2>&1

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-a always,exit -F arch=b64 -S sethostname -S setdomainname -k system-locale 
-a always,exit -F arch=b32 -S sethostname -S setdomainname -k system-locale 
-w /etc/issue -p wa -k system-locale
-w /etc/issue.net -p wa -k system-locale
-w /etc/hosts -p wa -k system-locale
-w /etc/sysconfig/network -p wa -k system-locale" >> /etc/audit/audit.rules
}