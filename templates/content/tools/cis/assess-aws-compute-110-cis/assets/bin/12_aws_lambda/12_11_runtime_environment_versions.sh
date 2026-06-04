#!/bin/bash

CRITICALITY=1
TITLE='Ensure that the runtime environment versions used for your Lambda functions do not have end of support dates.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
