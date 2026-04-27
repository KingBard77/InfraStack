#!/bin/sh

CRITICALITY=1
TITLE="Ensure cramfs kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v cramfs 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep cramfs > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install cramfs /bin/true" | tee -a /etc/modprobe.d/cramfs.conf > /dev/null
}
