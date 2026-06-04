#!/bin/bash

CRITICALITY=1
TITLE='Ensure awareness of TLS 1.3 new Diffie-Hellman parameters'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
