#!/bin/bash

CRITICALITY=1
TITLE="Ensure systemd-journal-remote is installed"

function check {
    STATUS="Fail"

    if dpkg-query -l systemd-journal-remote > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: systemd-journal-remote is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
	apt install -y systemd-journal-remote
}
