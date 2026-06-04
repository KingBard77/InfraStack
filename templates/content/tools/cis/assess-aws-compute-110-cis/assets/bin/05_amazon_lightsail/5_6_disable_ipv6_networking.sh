#!/bin/bash

CRITICALITY=1
TITLE='Disable IPv6 Networking if not in use within your organization.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
