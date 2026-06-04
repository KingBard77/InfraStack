#!/bin/sh

CRITICALITY=1
TITLE="Ensure default user umask is 027 or more restrictive"

function check {
	STATUS="Fail"

	for FILE in /etc/bashrc /etc/profile; do 
		if grep "^umask" /etc/bashrc ; then
			if [ $(grep "^umask" /etc/bashrc) -ge 027 ] ; then
				STATUS="Pass"
			fi
		fi
	done
}

function fix {
	sed -i s/"umask\ [0-9].."/"umask\ 027"/g /etc/bashrc
	sed -i s/"umask\ [0-9].."/"umask\ 027"/g /etc/profile
}
