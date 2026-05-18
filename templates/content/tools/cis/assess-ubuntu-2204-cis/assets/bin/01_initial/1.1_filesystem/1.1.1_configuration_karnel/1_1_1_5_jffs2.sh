#!/bin/sh

CRITICALITY=1
TITLE="Ensure jffs2 kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v jffs2 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep jffs2 > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install jffs2 /bin/true" | tee -a /etc/modprobe.d/jffs2.conf > /dev/null
}
