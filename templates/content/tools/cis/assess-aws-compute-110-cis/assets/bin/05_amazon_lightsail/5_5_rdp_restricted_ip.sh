#!/bin/bash

CRITICALITY=1
TITLE='Ensure RDP is restricted to only IP address that should have this access.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
