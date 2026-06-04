#!/bin/bash

CRITICALITY=1
TITLE="Ensure password failed attempts lockout is configured"

function check {
    deny="5"
    STATUS="Fail"

    if grep -E "^deny ${deny}" /etc/security/faillock.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: Deny is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    deny="5"
    cp -a /etc/security/faillock.conf /etc/security/faillock.conf.$(date +"%s")

    sed -i '/^\s*deny\s*/d' /etc/security/faillock.conf

    echo "deny ${deny}" | tee -a /etc/security/faillock.conf > /dev/null

}
