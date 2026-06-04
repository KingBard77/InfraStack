#!/bin/sh

CRITICALITY=1
TITLE="Ensure lockout for failed password attempts is configured"

function check {
	STATUS="Fail"

	if grep -z -E pam_faillock.*success=1\ default=bad.*pam_faillock /etc/pam.d/password-auth 2>&1 /dev/null; then
		STATUS="Pass"
	fi
}

function fix {
#	sed -i '/^auth.*required.*pam_faillock/d' /etc/pam.d/password-auth
#	sed -i '/^auth.*success=1.*default/d' /etc/pam.d/password-auth
#	sed -i '/^auth.*default.*die.*pam_faillock/d' /etc/pam.d/password-auth
#	sed -i '/^auth.*sufficient.*pam_faillock/d' /etc/pam.d/password-auth
#
#	echo "auth required pam_faillock.so preauth audit silent deny=5 unlock_time=900 
#auth [success=1 default=bad] pam_unix.so
#auth [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900 
#auth sufficient pam_faillock.so authsucc audit deny=5 unlock_time=900
#" >> /etc/pam.d/password-auth
#
#	sed -i '/^auth.*required.*pam_faillock/d' /etc/pam.d/system-auth
#	sed -i '/^auth.*success=1.*default/d' /etc/pam.d/system-auth
#	sed -i '/^auth.*default.*die.*pam_faillock/d' /etc/pam.d/system-auth
#	sed -i '/^auth.*sufficient.*pam_faillock/d' /etc/pam.d/system-auth
#
#	echo "auth required pam_faillock.so preauth audit silent deny=5 unlock_time=900 
#auth [success=1 default=bad] pam_unix.so
#auth [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900 
#auth sufficient pam_faillock.so authsucc audit deny=5 unlock_time=900
#" >> /etc/pam.d/system-auth
echo "Manual"
}





