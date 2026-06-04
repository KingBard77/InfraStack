#!/bin/sh

CRITICALITY=1
TITLE="Ensure IMAP and POP3 server is not enabled"

function check {
	STATUS="Fail"

	systemctl is-enabled dovecot > /dev/null 2>&1

	if [ $? != 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	systemctl disable dovecot
}