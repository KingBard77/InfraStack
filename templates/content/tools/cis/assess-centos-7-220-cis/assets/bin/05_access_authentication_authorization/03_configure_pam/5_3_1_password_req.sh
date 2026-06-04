#!/bin/sh

CRITICALITY=1
TITLE="Ensure password creation requirements are configured"

function check {
	STATUS="Fail"

	if grep pam_pwquality.so /etc/pam.d/password-auth 2>&1 > /dev/null; then
		if grep pam_pwquality.so /etc/pam.d/system-auth 2>&1 > /dev/null; then
			if grep ^minlen /etc/security/pwquality.conf 2>&1 > /dev/null; then
				if grep ^dcredit /etc/security/pwquality.conf 2>&1 > /dev/null; then
					if grep ^lcredit /etc/security/pwquality.conf 2>&1 > /dev/null; then
						if grep ^ocredit /etc/security/pwquality.conf 2>&1 > /dev/null; then
							if grep ^ucredit /etc/security/pwquality.conf 2>&1 > /dev/null; then
								STATUS="Pass"
							fi
						fi
					fi
				fi
			fi
		fi
	fi
}

function fix {
	#sed -i '/^password.*requisite/d' /etc/pam.d/password-auth
	#echo "password requisite pam_pwquality.so try_first_pass retry=3" >> /etc/pam.d/password-auth
	#sed -i '/^password.*requisite/d' /etc/pam.d/system-auth
	#echo "password requisite pam_pwquality.so try_first_pass retry=3" >> /etc/pam.d/system-auth
#
	#sed -i '/^minlen.*=/d' /etc/security/pwquality.conf
	#echo "minlen=14" >> /etc/security/pwquality.conf
	#sed -i '/^dcredit.*=/d' /etc/security/pwquality.conf
	#echo "dcredit=-1" >> /etc/security/pwquality.conf
	#sed -i '/^ucredit.*=/d' /etc/security/pwquality.conf
	#echo "ucredit=-1" >> /etc/security/pwquality.conf
	#sed -i '/^ocredit.*=/d' /etc/security/pwquality.conf
	#echo "ocredit=-1" >> /etc/security/pwquality.conf
	#sed -i '/^lcredit.*=/d' /etc/security/pwquality.conf
	#echo "lcredit=-1" >> /etc/security/pwquality.conf
	echo "Manual"
}
