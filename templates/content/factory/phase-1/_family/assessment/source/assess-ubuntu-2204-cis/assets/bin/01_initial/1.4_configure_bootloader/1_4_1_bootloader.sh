#!/bin/bash

CRITICALITY=1
TITLE="Ensure bootloader password is set"
function check {
    STATUS="Fail"

    if grep -E '^\s*GRUB2_PASSWORD=grub\.pbkdf2\.sha512\.' /boot/grub/user.cfg /boot/grub/grub.cfg > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: bootloader password is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires a site-approved bootloader password hash.'
}
