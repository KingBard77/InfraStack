#!/bin/bash

CRITICALITY=1
TITLE='Change the auto-generated password for Windows based instances.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
