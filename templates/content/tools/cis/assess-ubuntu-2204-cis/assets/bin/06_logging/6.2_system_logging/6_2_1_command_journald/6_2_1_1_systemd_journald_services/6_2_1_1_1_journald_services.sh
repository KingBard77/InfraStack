#!/bin/bash

CRITICALITY=1
TITLE="Ensure journald service is enabled and active"

function check {
    STATUS="Fail"

    if systemctl is-enabled systemd-journald.service | grep -F 'static' > /dev/null 2>&1; then
        if systemctl is-active systemd-journald.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: systemd-journald.service is not static"
        fi
    else
        STATUS="Fail: systemd-journald.service is not static and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl unmask systemd-journald.service
	systemctl start systemd-journald.service
}
