#!/bin/bash

CRITICALITY=1
TITLE="Ensure address space layout randomization is enabled"

function check {
    STATUS="Fail"
    ASLR_VALUE=$(sysctl kernel.randomize_va_space | awk '{print $3}')

    if [ "$ASLR_VALUE" == "2" ]; then
        STATUS="Pass"
    else
        STATUS="Fail: ASLR is not set to 2"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "kernel.randomize_va_space = 2" | sudo tee -a /etc/sysctl.d/99-sysctl.conf > /dev/null
    sysctl -w kernel.randomize_va_space=2
}