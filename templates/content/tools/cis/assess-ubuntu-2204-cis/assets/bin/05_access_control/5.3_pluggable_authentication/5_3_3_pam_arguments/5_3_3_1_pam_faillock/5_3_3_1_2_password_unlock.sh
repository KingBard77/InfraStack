#!/bin/sh

CRITICALITY=1
TITLE="Ensure password unlock time is configured"

unlock_time="900"

function check {
    STATUS="Fail"

    if grep -E "^unlock_time ${unlock_time}" /etc/security/faillock.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: Deny is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/security/faillock.conf /etc/security/faillock.conf.$(date +"%s")

    sed -i '/^\s*unlock_time\s*/d' /etc/security/faillock.conf

    echo "unlock_time ${unlock_time}" | tee -a /etc/security/faillock.conf > /dev/null

}
