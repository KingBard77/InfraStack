#!/bin/bash

CRITICALITY=1
TITLE="Ensure bootloader password is set"

function check {
    STATUS="Fail"

    if grep -E "^set superusers|^password_pbkdf2" /boot/grub/grub.cfg > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: Bootloader configuration is not set"
    fi

    echo "Check status: $STATUS"
}


function fix {
    echo "Manual"
}