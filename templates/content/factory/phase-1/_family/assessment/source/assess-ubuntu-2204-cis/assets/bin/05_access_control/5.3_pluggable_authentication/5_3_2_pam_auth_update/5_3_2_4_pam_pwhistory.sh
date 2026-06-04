#!/bin/sh

CRITICALITY=1
TITLE="Ensure pam_pwhistory module is enabled"

function check {
    STATUS="Fail"

    if grep -P -- 'bpam_pwhistory.sob' /usr/share/pam-configs/* > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: pam_pwhistory is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
	# Create a PAM configuration for pwhistory
    cat <<EOF > /usr/share/pam-configs/pwhistory
Name: pwhistory password history checking
Default: yes
Priority: 1024
Password-Type: Primary
Password:
  requisite pam_pwhistory.so remember=24 enforce_for_root try_first_pass use_authtok
EOF

    # Update PAM configurations
    pam-auth-update --enable pwhistory
}
