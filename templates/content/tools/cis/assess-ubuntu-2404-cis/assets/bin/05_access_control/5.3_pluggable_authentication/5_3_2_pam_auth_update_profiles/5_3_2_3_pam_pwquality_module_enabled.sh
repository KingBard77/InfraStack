#!/bin/bash

CRITICALITY=1
TITLE="Ensure pam_pwquality module is enabled"

function check {
    STATUS="Fail"

    if grep -P -- 'bpam_pwquality.sob' /usr/share/pam-configs/* > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: pam_pwquality is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
	# Create a PAM configuration for pwquality
	cat <<EOF > /usr/share/pam-configs/pwquality
	Name: Pwquality password strength checking
	Default: yes
	Priority: 1024
	Conflicts: cracklib
	Password-Type: Primary
	Password:
	  requisite pam_pwquality.so retry=3
	Password-Initial:
	  requisite
EOF

    pam-auth-update --enable pwquality
}
