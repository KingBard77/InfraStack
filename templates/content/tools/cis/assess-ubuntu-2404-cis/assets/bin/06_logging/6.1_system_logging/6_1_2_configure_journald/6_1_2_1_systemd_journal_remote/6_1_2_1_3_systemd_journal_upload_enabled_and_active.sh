#!/bin/bash

CRITICALITY=1
TITLE="Ensure systemd-journal-upload is enabled and active"

function check {
    STATUS="Fail"

    if systemctl is-enabled systemd-journal-upload.service | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active systemd-journal-upload.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: systemd-journald-upload.service is not enabled"
        fi
    else
        STATUS="Fail: systemd-journald-upload.service is not enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl unmask systemd-journal-upload.service
	systemctl --now enable systemd-journal-upload.service
}
