#!/bin/sh

CRITICALITY=2
TITLE="Ensure udf kernel module is not available"

function check {
    STATUS="Fail"

    modprobe -n -v udf 2>&1 | grep -E "install" > /dev/null

    if [ $? == 0 ]; then
        lsmod 2>&1 | grep udf > /dev/null

        if [ $? != 0 ]; then
            STATUS="Pass"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "install udf /bin/true" | tee -a /etc/modprobe.d/udf.conf > /dev/null
}
