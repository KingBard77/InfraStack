#!/bin/bash

CRITICALITY=1
TITLE="Ensure pam_unix includes a strong password hashing algorithm"
function check {
    MODULE="pam_unix.so"
    REQUIRED="sha512"
    STATUS="Fail"

    LINE="$(grep -E "^\s*password\s+.*$MODULE" /etc/pam.d/common-password 2>/dev/null | head -n 1)"
    if [[ -n "$LINE" ]] && echo "$LINE" | grep -Eq "(^|[[:space:]])$REQUIRED([[:space:]]|$)"; then
        STATUS="Pass"
    else
        STATUS="Fail: $MODULE does not include $REQUIRED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/pam.d/common-password /etc/pam.d/common-password.$(date +"%s")
    if grep -Eq '^\s*password\s+.*pam_unix\.so' /etc/pam.d/common-password; then
        sed -i -E '/pam_unix\.so/ { /(^|[[:space:]])sha512([[:space:]]|$)/! s/$/ sha512/ }' /etc/pam.d/common-password
    else
        echo 'password requisite pam_unix.so sha512' | tee -a /etc/pam.d/common-password > /dev/null
    fi
}
