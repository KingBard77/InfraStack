#!/bin/bash

CRITICALITY=1
TITLE='Ensure communications between your applications and clients is encrypted.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
