#!/bin/sh

CRITICALITY=1
TITLE="Ensure freevxfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v freevxfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep freevxfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install freevxfs /bin/true" | tee -a /etc/modprobe.d/freevxfs.conf > /dev/null
}
