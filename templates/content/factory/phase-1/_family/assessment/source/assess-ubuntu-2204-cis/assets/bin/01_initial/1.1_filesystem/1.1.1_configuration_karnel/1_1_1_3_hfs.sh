#!/bin/sh

CRITICALITY=1
TITLE="Ensure hfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v hfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep hfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install hfs /bin/true" | tee -a /etc/modprobe.d/hfs.conf > /dev/null
}
