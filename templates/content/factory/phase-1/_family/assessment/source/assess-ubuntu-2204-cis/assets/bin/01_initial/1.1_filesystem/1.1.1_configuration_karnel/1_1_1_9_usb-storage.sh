#!/bin/sh

CRITICALITY=2
TITLE="Ensure usb-storage kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v usb-storage 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep usb-storage > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install usb-storage /bin/true" | tee -a /etc/modprobe.d/usb-storage.conf > /dev/null
}
