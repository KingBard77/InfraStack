#!/bin/bash

CRITICALITY=1
TITLE="Ensure hfsplus kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v hfsplus 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep hfsplus > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install hfsplus /bin/true" | tee -a /etc/modprobe.d/hfsplus.conf > /dev/null
}
