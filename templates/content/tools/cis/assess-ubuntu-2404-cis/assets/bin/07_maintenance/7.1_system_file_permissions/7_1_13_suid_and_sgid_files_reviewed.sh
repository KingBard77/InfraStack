#!/bin/bash

CRITICALITY=1
TITLE="Ensure SUID and SGID files are reviewed"

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}
