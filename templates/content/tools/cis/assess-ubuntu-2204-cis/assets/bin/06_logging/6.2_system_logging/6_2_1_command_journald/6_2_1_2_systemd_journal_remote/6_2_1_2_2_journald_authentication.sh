#!/bin/sh

CRITICALITY=1
TITLE="Ensure journald log file rotation is configured"

function check {
    STATUS="Fail"

    if grep -E "^URL=" /etc/systemd/journal-upload.conf > /dev/null 2>&1; then
        if grep -E "^ServerKeyFile=" /etc/systemd/journal-upload.conf > /dev/null 2>&1; then
            if grep -E "^ServerCertificateFile=" /etc/systemd/journal-upload.conf > /dev/null 2>&1; then
                if grep -E "^TrustedCertificateFile=" /etc/systemd/journal-upload.conf > /dev/null 2>&1; then
                fi
            fi
        fi
    fi

    if [ "$STATUS" != "Pass" ]; then
        echo "Failed: One or more parameters are not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
	echo "Manual"
}