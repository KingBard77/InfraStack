#!/bin/bash

CRITICALITY=1
TITLE="Ensure access to bootloader config is configured"

function check {
    STATUS="Fail"

    if stat -Lc 'Access: (%#a/%A) Uid: ( %u/ %U) Gid: ( %g/ %G)' /boot/grub/grub.cfg > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: Access to bootloader is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    chown root:root /boot/grub/grub.cfg
    chmod u-x,go-rwx /boot/grub/grub.cfg
}
