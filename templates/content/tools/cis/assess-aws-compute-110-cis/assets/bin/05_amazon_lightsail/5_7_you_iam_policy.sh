#!/bin/bash

CRITICALITY=1
TITLE='Ensure you are using an IAM policy to manage access to buckets in Lightsail.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
