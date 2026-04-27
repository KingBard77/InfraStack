#!/bin/sh

CRITICALITY=1
TITLE="Ensure system accounts do not have a valid login shell"

function check {
    STATUS="Fail"

    echo "Check status: $STATUS"
}

function fix {
	echo "Manual"
    echo "usermod -s $(command -v nologin) <user>"
}
