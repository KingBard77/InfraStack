#!/bin/bash

CRITICALITY=1
TITLE="Ensure AIDE is installed"

function check {
    STATUS="Fail"

    if dpkg-query -l aide aide-common > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: AIDE is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
	apt install aide aide-common
	aideinit
	mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
}
