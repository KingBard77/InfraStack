#!/bin/bash

CRITICALITY=1
TITLE='Ensure access logs are enabled.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
