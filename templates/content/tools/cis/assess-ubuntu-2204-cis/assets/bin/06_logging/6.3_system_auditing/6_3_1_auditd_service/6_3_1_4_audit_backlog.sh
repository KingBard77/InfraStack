#!/bin/sh

CRITICALITY=2
TITLE="Ensure audit_backlog_limit is sufficient"

GRUB_CMDLINE_LINUX="audit_backlog_limit=8192"

function check {
    STATUS="Fail"

    if grep -E "^GRUB_CMDLINE_LINUX=${GRUB_CMDLINE_LINUX}" /etc/default/grub > /dev/null 2>&1; then
        STATUS="Pass"
    else
        echo "Failed: GRUB_CMDLINE_LINUX is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/default/grub /etc/default/grub.$(date +"%s")

    sed -i '/^\s*GRUB_CMDLINE_LINUX\s*/d' /etc/default/grub

    echo "GRUB_CMDLINE_LINUX=${GRUB_CMDLINE_LINUX}" | tee -a /etc/default/grub > /dev/null

    update-grub
}