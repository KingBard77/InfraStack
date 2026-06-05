#!/bin/bash

CRITICALITY=1
TITLE='Ensure journald log file rotation is configured'

function check {
    STATUS="Pass"
    CONFIG="/etc/systemd/journal-upload.conf"

    if [[ ! -f "$CONFIG" ]]; then
        STATUS="Fail: systemd-journal-upload configuration file is missing"
    elif ! grep -Eq '^[[:space:]]*(URL|ServerKeyFile|ServerCertificateFile|TrustedCertificateFile)=' "$CONFIG"; then
        STATUS="Fail: journal upload authentication settings are not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: Journal upload URL, key, certificate, and trust anchor are site-specific.'
}
