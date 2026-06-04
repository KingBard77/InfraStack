#!/bin/sh

CRITICALITY=1
TITLE="Ensure system is disabled when audit logs are full"

function check {
	STATUS="Fail"

	grep ^space_left_action /etc/audit/auditd.conf | grep email  > /dev/null 2>&1

	if [ $? == 0 ]; then
		grep ^action_mail_acct /etc/audit/auditd.conf | grep root > /dev/null 2>&1
		if [ $? == 0 ]; then
			grep ^admin_space_left_action /etc/audit/auditd.conf | grep halt > /dev/null 2>&1
			if [ $? == 0 ]; then
				STATUS="Pass"
			fi
		fi
	fi
}

function fix {
	echo "space_left_action = email
action_mail_acct = root
admin_space_left_action = halt" >> /etc/audit/auditd.conf
}