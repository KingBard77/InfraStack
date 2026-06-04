#!/bin/bash

CRITICALITY=1
TITLE='Ensure Lightsail instances are attached to the buckets'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
