#!/bin/sh

CRITICALITY=1
TITLE="Ensure password hashing algorithm is SHA-512"

function check {
	STATUS="Fail"

	if grep -E '^password\s+sufficient\s+pam_unix.so.*sha512' /etc/pam.d/password-auth 2>&1 > /dev/null; then
		if grep -E '^password\s+sufficient\s+pam_unix.so.*sha512' /etc/pam.d/system-auth 2>&1 > /dev/null; then
			STATUS="Pass"
		fi
	fi
}

function fix {
	#sed -i '/^password.*sufficient.*pam_unix/d' /etc/pam.d/password-auth
	#echo "password sufficient pam_unix.so sha512 shadow nullok try_first_pass use_authtok remember=5" >> /etc/pam.d/password-auth
#
	#sed -i '/^password.*sufficient.*pam_unix/d' /etc/pam.d/system-auth
	#echo "password sufficient pam_unix.so sha512 shadow nullok try_first_pass use_authtok remember=5" >> /etc/pam.d/system-auth
	echo "Manual"
}
