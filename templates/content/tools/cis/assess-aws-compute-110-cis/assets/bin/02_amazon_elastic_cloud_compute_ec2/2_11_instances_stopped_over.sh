#!/bin/bash

CRITICALITY=1
TITLE='Ensure instances stopped for over 90 days are removed'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
