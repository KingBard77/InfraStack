#!/bin/sh

CRITICALITY=1
TITLE="Ensure libpam-pwquality is installed"

function check {

    STATUS="Fail"

    if dpkg-query -s libpam-pwquality > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: libpam-pwquality is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {

	apt upgrade libpam-pwquality
}