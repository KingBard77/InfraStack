#!/bin/bash

CRITICALITY=1
TITLE='Ensure encryption in transit is enabled for Lambda environment variables'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
