#!/bin/sh

CRITICALITY=1
TITLE="Ensure password expiration is configured"

PASS_MAX_DAYS="365"

function check {
    STATUS="Fail"

    if grep -E "^PASS_MAX_DAYS ${PASS_MAX_DAYS}" /etc/login.defs > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: PASS_MAX_DAYS is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/login.defs /etc/login.defs.$(date +"%s")

    sed -i '/^\s*PASS_MAX_DAYS\s*/d' /etc/login.defs

    echo "PASS_MAX_DAYS ${PASS_MAX_DAYS}" | tee -a /etc/login.defs> /dev/null

}
