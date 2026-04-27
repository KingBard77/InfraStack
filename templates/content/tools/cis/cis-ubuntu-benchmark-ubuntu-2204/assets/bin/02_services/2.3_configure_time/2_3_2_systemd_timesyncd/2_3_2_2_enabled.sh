#!/bin/bash

CRITICALITY=1
TITLE="Ensure systemd-timesyncd is enabled and running"

function check {
    STATUS="Fail"

    if systemctl is-enabled systemd-timesyncd.service | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active systemd-timesyncd.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: systemd-timesyncd is not active"
        fi
    else
        STATUS="Fail: systemd-timesyncd is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl unmask systemd-timesyncd.service
    systemctl --now enable systemd-timesyncd.service
	# systemctl --now mask systemd-timesyncd.service
}
