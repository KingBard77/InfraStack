#!/bin/bash

CRITICALITY=2
TITLE='Ensure detailed monitoring is enable for production EC2 Instances'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
