#!/bin/sh

CRITICALITY=1
TITLE="Ensure group root is the only GID 0 group"

function check {
    STATUS="Fail"

    if awk -F: '$3=="0"{print $1":"$3}' /etc/group > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: root is not GID 0 Group"
    fi

    echo "Check status: $STATUS"
}

function fix {
	groupmod -g 0 root
}
