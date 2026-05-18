#!/bin/sh

CRITICALITY=1
TITLE="Ensure unused filesystems kernel modules are not available"

function check {
    STATUS="Fail: Manual review required"

    echo "Identify filesystem kernel modules that are not required by this host and ensure they are disabled."
    echo "Review /lib/modules/$(uname -r)/kernel/fs and /etc/modprobe.d/ for module availability and deny rules."
    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
