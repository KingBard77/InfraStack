#!/bin/bash

CRITICALITY=1
TITLE="Ensure systemd-journal-remote service is not in use"

function check {
    STATUS="Fail"

    if systemctl is-enabled systemd-journal-remote.socket systemd-journal-remote.service | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active systemd-journal-remote.socket systemd-journal-remote.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: systemd-journal-remote.socket systemd-journal-remote.service is enabled"
        fi
    else
        STATUS="Fail: systemd-journal-remote.socket systemd-journal-remote.service is enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl stop systemd-journal-remote.socket systemd-journal-remote.service 
	systemctl mask systemd-journal-remote.socket systemd-journal-remote.service
}
