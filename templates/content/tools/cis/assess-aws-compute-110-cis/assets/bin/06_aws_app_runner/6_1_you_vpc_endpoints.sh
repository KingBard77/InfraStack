#!/bin/bash

CRITICALITY=1
TITLE='Ensure you are using VPC Endpoints for source code access'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
