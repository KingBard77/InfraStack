#!/bin/bash

CRITICALITY=2
TITLE="Ensure auditing for processes that start prior to auditd is enabled"

function check {
    GRUB_CMDLINE_LINUX="audit=1"
    STATUS="Fail"

    if grep -E "^GRUB_CMDLINE_LINUX=${GRUB_CMDLINE_LINUX}" /etc/default/grub > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: GRUB_CMDLINE_LINUX is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    GRUB_CMDLINE_LINUX="audit=1"
    cp -a /etc/default/grub /etc/default/grub.$(date +"%s")

    sed -i '/^\s*GRUB_CMDLINE_LINUX\s*/d' /etc/default/grub

    echo "GRUB_CMDLINE_LINUX=${GRUB_CMDLINE_LINUX}" | tee -a /etc/default/grub > /dev/null

    update-grub
}
