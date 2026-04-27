#!/bin/sh

CRITICALITY=1
TITLE="Ensure accounts without a valid login shell are locked"

function check {
    STATUS="Fail"

    echo "Check status: $STATUS"
}

function fix {
	echo "Manual"
    echo "usermod -L <user>"
}
