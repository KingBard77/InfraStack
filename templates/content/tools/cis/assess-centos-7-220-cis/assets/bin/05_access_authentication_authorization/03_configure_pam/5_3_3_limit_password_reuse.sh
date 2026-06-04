#!/bin/sh

CRITICALITY=1
TITLE="Ensure password reuse is limited"

function check {
	STATUS="Fail"

	TOTAL=0

	for AUTH in /etc/pam.d/password-auth /etc/pam.d/system-auth; do
		if grep -E '^password\s+sufficient\s+pam_unix.so.*remember' $AUTH; then
			$TOTAL=$(( $TOTAL + $(grep -E '^password\s+sufficient\s+pam_unix.so.*remember' $AUTH | sed s/^remember=//g) ))
		fi
	done

	if [ $TOTAL -ge 10 ] ; then
		STATUS="Pass"
	fi
}

function fix {
	#sed -i "/^password.*sufficient.*pam_unix/d" /etc/pam.d/password-auth
	#echo "password sufficient pam_unix.so sha512 shadow nullok try_first_pass use_authtok remember=5" >> /etc/pam.d/password-auth
#
	#sed -i "/^password.*sufficient.*pam_unix/d" /etc/pam.d/system-auth
	#echo "password sufficient pam_unix.so sha512 shadow nullok try_first_pass use_authtok remember=5" >> /etc/pam.d/system-auth
	echo "Manual"
}
