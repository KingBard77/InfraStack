#!/bin/bash

CRITICALITY=1
TITLE='Change default Administrator login names and passwords for applications'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
