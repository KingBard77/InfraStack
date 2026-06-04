#!/bin/sh

CRITICALITY=1
TITLE="Ensure root is the only UID 0 account"

function check {
	STATUS="Fail"

	cat /etc/passwd | awk -F: '($3 == 0) { print $1 }' | grep root 2>&1 > /dev/null

	if [ $?  == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	for i in $(cat /etc/passwd | awk -F: '($3 == 0) { print $1 }' | grep -v root); do 
		sed -i "/^$i/d" /etc/passwd; 
	done
}