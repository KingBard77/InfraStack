#!/bin/bash

CRITICALITY=1
TITLE='Ensure that HTTPS is enabled on load balancer'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
