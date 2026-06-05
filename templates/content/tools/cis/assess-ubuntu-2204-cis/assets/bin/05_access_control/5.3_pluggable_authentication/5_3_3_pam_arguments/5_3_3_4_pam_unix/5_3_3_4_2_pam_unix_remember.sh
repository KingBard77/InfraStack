#!/bin/bash

CRITICALITY=1
TITLE="Ensure pam_unix does not include remember"
function check {
    MODULE="pam_unix.so"
    REQUIRED="use_authtok"
    STATUS="Fail"

    LINE="$(grep -E "^\s*password\s+.*$MODULE" /etc/pam.d/common-password 2>/dev/null | head -n 1)"
    if [[ -n "$LINE" ]] && echo "$LINE" | grep -Eq "(^|[[:space:]])$REQUIRED([[:space:]]|$)"; then
        STATUS="Pass"
    else
        STATUS="Fail: $MODULE does not include $REQUIRED"
    fi
        if echo "$LINE" | grep -Eq '(^|[[:space:]])remember([[:space:]]|$)'; then STATUS="Fail: pam_unix.so includes forbidden argument remember"; fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/pam.d/common-password /etc/pam.d/common-password.$(date +"%s")
    sed -i -E '/pam_unix\.so/ s/(^|[[:space:]])remember([[:space:]]|$)/ /g' /etc/pam.d/common-password
    if grep -Eq '^\s*password\s+.*pam_unix\.so' /etc/pam.d/common-password; then
        sed -i -E '/pam_unix\.so/ { /(^|[[:space:]])use_authtok([[:space:]]|$)/! s/$/ use_authtok/ }' /etc/pam.d/common-password
    else
        echo 'password requisite pam_unix.so use_authtok' | tee -a /etc/pam.d/common-password > /dev/null
    fi
}
