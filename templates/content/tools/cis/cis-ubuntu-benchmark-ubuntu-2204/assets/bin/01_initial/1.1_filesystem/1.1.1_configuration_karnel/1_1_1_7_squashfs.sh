#!/bin/sh

CRITICALITY=1
TITLE="Ensure squashfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v squashfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep squashfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install squashfs /bin/true" | tee -a /etc/modprobe.d/squashfs.conf > /dev/null
}
