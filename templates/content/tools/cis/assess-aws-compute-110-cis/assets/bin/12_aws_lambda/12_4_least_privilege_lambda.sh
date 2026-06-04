#!/bin/bash

CRITICALITY=1
TITLE='Ensure least privilege is used with Lambda function access'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
