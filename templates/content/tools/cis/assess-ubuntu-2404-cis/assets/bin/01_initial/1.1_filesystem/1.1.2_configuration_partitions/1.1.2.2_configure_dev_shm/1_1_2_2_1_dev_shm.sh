#!/bin/bash

CRITICALITY=1
TITLE="Ensure /dev/shm is a separate partition"

function check {
    STATUS="Fail"

    if mount | grep "/dev/shm" > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Not mounted with tmpfs or missing/extra options"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if cat /etc/fstab | grep /dev/shm; then
        echo "/dev/shm is already configured correctly."
    else
        sudo sh -c "grep -q '/dev/shm' /etc/fstab || echo 'tmpfs /dev/shm tmpfs defaults,rw,nosuid,nodev,noexec,relatime,size=2G 0 0' >> /etc/fstab"

        mount -o remount /dev/shm
    fi
}
