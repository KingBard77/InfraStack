#!/bin/sh

CRITICALITY=1
TITLE="Ensure libpam-modules is installed"

function check {

    STATUS="Fail"

    if dpkg-query -s libpam-modules > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: libpam-modules is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {

	apt upgrade libpam-modules
}