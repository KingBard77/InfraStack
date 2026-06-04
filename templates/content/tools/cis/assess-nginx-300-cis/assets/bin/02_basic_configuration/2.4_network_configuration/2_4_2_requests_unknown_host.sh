#!/bin/bash

CRITICALITY=1
TITLE='Ensure requests for unknown host names are rejected'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
