#!/bin/bash

CRITICALITY=1
TITLE="Ensure message of the day is configured properly"

function check {
    STATUS="Fail"

    if grep -E -i "(\\\v|\\\r|\\\m|\\\s|$(grep '^ID=' /etc/os-release | cut -d= -f2 | sed -e 's/"//g'))" /etc/motd > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: motd file is exist"
    fi

    echo "Check status: $STATUS"
}

function fix {
	rm /etc/motd
}
