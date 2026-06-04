#!/bin/sh

CRITICALITY=1
TITLE="Ensure changes to system administration scope (sudoers) is collected"

function check {
	STATUS="Fail"

	grep scope /etc/audit/audit.rules | grep "sudoers|sudoers.d" |

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	echo "-w /etc/sudoers -p wa -k scope
-w /etc/sudoers.d -p wa -k scope" >> /etc/audit/audit.rules
}