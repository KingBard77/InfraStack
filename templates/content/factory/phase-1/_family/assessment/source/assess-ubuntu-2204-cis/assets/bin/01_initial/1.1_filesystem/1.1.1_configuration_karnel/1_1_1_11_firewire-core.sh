#!/bin/sh

CRITICALITY=2
TITLE="Ensure firewire-core kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v firewire-core 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep firewire_core > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install firewire-core /bin/true" | tee -a /etc/modprobe.d/firewire-core.conf > /dev/null
}
