#!/bin/bash

CRITICALITY=1
TITLE='Ensure your Windows Server based lightsail instances are updated with the latest security patches.'

function check {
    STATUS="Fail: Manual review required"
    echo "Manual"
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
