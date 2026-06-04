#!/bin/bash

CRITICALITY=1
TITLE="Ensure password history is enforced for the root user"
function check {
    MODULE="pam_pwhistory.so"
    REQUIRED="enforce_for_root"
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
        sed -i -E '/pam_pwhistory\.so/ { /(^|[[:space:]])enforce_for_root([[:space:]]|$)/! s/$/ enforce_for_root/ }' /etc/pam.d/common-password
    else
        echo 'password requisite pam_pwhistory.so enforce_for_root' | tee -a /etc/pam.d/common-password > /dev/null
    fi
}
