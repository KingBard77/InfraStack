#!/bin/sh

CRITICALITY=1
TITLE="Ensure minimum password age is configured"

PASS_MIN_DAYS="1"

function check {
    STATUS="Fail"

    if grep -E "^PASS_MIN_DAYS ${PASS_MIN_DAYS}" /etc/login.defs > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: PASS_MIN_DAYS is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/login.defs /etc/login.defs.$(date +"%s")

    sed -i '/^\s*PASS_MIN_DAYS\s*/d' /etc/login.defs

    echo "PASS_MIN_DAYS ${PASS_MIN_DAYS}" | tee -a /etc/login.defs> /dev/null

}
