#!/bin/bash

CRITICALITY=1
TITLE='Ensure the NGINX reverse proxy does not enable information disclosure'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
