#!/bin/bash

CRITICALITY=1
TITLE="Ensure pam_unix module is enabled"

function check {

    STATUS="Fail"

    if grep -P -- '\bpam_unix\.so\b' /etc/pam.d/common-{account,session,auth,password} > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: pam_unix is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {

	pam-auth-update --enable unix
}
