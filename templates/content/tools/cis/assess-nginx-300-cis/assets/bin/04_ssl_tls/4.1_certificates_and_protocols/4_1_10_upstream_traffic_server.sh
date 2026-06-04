#!/bin/bash

CRITICALITY=2
TITLE='Ensure the upstream traffic server certificate is trusted'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
