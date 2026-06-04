#!/bin/bash

CRITICALITY=1
TITLE='Ensure AWS Secrets manager is configured and being used by Lambda for databases'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
