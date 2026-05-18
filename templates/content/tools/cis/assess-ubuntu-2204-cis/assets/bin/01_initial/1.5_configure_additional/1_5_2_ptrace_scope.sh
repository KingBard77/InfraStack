#!/bin/bash

CRITICALITY=1
TITLE="Ensure ptrace_scope is restricted"

function check {
    STATUS="Fail"
    PTRACE_SCOPE=$(sysctl kernel.yama.ptrace_scope | awk '{print $3}')

    if [ "$PTRACE_SCOPE" == "1" ]; then
        STATUS="Pass"
    else
        STATUS="Fail: ptrace_scope is not set to restricted mode (1)"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "kernel.yama.ptrace_scope = 1" | sudo tee -a /etc/sysctl.d/60-kernel_sysctl.conf > /dev/null
    sysctl -w kernel.yama.ptrace_scope=1
}
