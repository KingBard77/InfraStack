#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is enabled and running"

# Check if systemd-timesyncd was configure
if systemctl is-active --quiet systemd-timesyncd && systemctl is-enabled --quiet systemd-timesyncd; then
    echo "Check status: Pass - systemd-timesyncd is active and enabled. Skipping Chrony configuration."
    exit 0
fi

function check {
    STATUS="Fail"

    if systemctl is-enabled chrony.service | grep -F 'enabled' > /dev/null 2>&1; then
        if systemctl is-active chrony.service | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: auditd is not enabled"
        fi
    else
        STATUS="Fail: auditd is not enabled and active"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl unmask chrony.service
	systemctl --now enable chrony.servicesys
	# apt purge chrony
	# apt autoremove chrony
}
