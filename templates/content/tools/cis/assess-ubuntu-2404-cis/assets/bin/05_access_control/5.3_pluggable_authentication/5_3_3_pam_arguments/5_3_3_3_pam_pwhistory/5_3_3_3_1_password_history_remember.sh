#!/bin/bash

CRITICALITY=1
TITLE="Ensure password history remember is configured"
function check {
    MODULE="pam_pwhistory.so"
    REQUIRED="remember=24"
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
    if grep -Eq '^\s*password\s+.*pam_pwhistory\.so' /etc/pam.d/common-password; then
        sed -i -E '/pam_pwhistory\.so/ { /(^|[[:space:]])remember=24([[:space:]]|$)/! s/$/ remember=24/ }' /etc/pam.d/common-password
    else
        echo 'password requisite pam_pwhistory.so remember=24' | tee -a /etc/pam.d/common-password > /dev/null
    fi
}
