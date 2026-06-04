#!/bin/bash

CRITICALITY=1
TITLE='Ensure NGINX only listens for network connections on authorized ports'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
