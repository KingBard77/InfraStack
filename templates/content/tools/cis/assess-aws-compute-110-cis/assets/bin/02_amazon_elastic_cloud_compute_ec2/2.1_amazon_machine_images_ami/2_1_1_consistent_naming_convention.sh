#!/bin/bash

CRITICALITY=1
TITLE='Ensure Consistent Naming Convention is used for Organizational AMI'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
