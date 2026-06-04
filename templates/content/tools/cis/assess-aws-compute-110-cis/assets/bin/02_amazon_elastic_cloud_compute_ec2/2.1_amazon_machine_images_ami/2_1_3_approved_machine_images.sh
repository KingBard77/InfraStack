#!/bin/bash

CRITICALITY=1
TITLE='Ensure Only Approved Amazon Machine Images (AMIs) are Used'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
