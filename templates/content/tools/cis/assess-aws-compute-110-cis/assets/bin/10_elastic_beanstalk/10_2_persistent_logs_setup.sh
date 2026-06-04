#!/bin/bash

CRITICALITY=1
TITLE='Ensure Persistent logs is setup and configured to S3'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
