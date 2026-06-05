#!/bin/sh

CRITICALITY=2
TITLE="Ensure overlayfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v overlayfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep overlayfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install overlayfs /bin/true" | tee -a /etc/modprobe.d/overlayfs.conf > /dev/null
}
