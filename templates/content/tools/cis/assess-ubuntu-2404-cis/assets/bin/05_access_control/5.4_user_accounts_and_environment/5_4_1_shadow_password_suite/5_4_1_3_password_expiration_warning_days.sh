#!/bin/bash

CRITICALITY=1
TITLE="Ensure password expiration warning days is configured"

function check {
    PASS_WARN_AGE="7"
    STATUS="Fail"

    if grep -E "^PASS_WARN_AGE ${PASS_WARN_AGE}" /etc/login.defs > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: PASS_WARN_AGE is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    PASS_WARN_AGE="7"
    cp -a /etc/login.defs /etc/login.defs.$(date +"%s")

    sed -i '/^\s*PASS_WARN_AGE\s*/d' /etc/login.defs

    echo "PASS_WARN_AGE ${PASS_WARN_AGE}" | tee -a /etc/login.defs> /dev/null

}
