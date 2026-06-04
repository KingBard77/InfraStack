#!/bin/bash

CRITICALITY=1
TITLE='Apply updates to any apps running in Lightsail'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
