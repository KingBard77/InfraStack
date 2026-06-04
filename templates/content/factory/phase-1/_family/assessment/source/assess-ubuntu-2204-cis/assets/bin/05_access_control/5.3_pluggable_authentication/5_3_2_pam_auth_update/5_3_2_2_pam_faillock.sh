#!/bin/sh

CRITICALITY=1
TITLE="Ensure pam_faillock module is enabled"

function check {
    STATUS="Fail"

    if grep -P -- '\bpam_faillock\.so\b' /etc/pam.d/common-{auth,account} > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: pam_faillock is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    # Create PAM configuration for enabling pam_faillock
    cat <<EOF > /usr/share/pam-configs/faillock
Name: Enable pam_faillock to deny access
Default: yes
Priority: 0
Auth-Type: Primary
Auth:
  [default=die] pam_faillock.so authfail
EOF

    # Create PAM configuration for faillock notifications
    cat <<EOF > /usr/share/pam-configs/faillock_notify
Name: Notify of failed login attempts and reset count upon success
Default: yes
Priority: 1024
Auth-Type: Primary
Auth:
  requisite pam_faillock.so preauth
Account-Type: Primary
Account:
  required pam_faillock.so
EOF

    pam-auth-update --enable faillock
    pam-auth-update --enable faillock_notify
}