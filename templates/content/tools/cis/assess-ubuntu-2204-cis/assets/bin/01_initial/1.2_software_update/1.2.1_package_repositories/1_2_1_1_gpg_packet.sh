#!/bin/sh

CRITICALITY=1
TITLE="Ensure GPG checks are globally activated for APT"

function check {
    STATUS="Fail"

    # grep -r "^deb " /etc/apt/sources.list /etc/apt/sources.list.d/

    if grep -r "trusted=yes" /etc/apt/sources.list /etc/apt/sources.list.d/ > /dev/null; then
        STATUS="Pass: All APT sources specify GPG checks"
    else
        STATUS="Fail: Some APT sources do not specify GPG checks"
    fi

    echo "Check status: $STATUS"
}


function fix {
    echo "Manual"
}