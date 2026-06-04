#!/bin/bash

CRITICALITY=1
TITLE='Ensure a trusted certificate and trust chain is installed'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
