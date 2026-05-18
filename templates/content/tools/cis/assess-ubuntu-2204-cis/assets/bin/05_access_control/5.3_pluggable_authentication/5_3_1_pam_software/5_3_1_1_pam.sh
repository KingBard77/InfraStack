#!/bin/sh

CRITICALITY=1
TITLE="Ensure latest version of pam is installed"

function check {

    STATUS="Fail"

    if dpkg-query -l libpam-runtime > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: libpam-runtime is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {

	apt upgrade libpam-runtime
}