#!/bin/bash

CRITICALITY=1
TITLE='Ensure only required dynamic modules are loaded'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
