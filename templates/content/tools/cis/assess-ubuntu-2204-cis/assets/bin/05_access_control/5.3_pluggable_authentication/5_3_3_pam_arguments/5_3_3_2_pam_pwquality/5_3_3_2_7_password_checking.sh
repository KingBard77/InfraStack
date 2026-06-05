#!/bin/bash

CRITICALITY=1
TITLE="Ensure password quality checking is enforced"
function check {
    MODULE="pam_pwquality.so"
    REQUIRED="retry=3"
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
    if grep -Eq '^\s*password\s+.*pam_pwquality\.so' /etc/pam.d/common-password; then
        sed -i -E '/pam_pwquality\.so/ { /(^|[[:space:]])retry=3([[:space:]]|$)/! s/$/ retry=3/ }' /etc/pam.d/common-password
    else
        echo 'password requisite pam_pwquality.so retry=3' | tee -a /etc/pam.d/common-password > /dev/null
    fi
}
