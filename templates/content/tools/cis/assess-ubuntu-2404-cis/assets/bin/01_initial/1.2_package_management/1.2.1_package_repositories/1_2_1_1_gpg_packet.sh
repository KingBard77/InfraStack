#!/bin/bash

CRITICALITY=1
TITLE='Ensure GPG keys are configured'

function check {
    STATUS="Pass"

    if ! find /etc/apt/trusted.gpg.d /usr/share/keyrings /etc/apt/keyrings -type f \( -name '*.gpg' -o -name '*.asc' \) -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: no APT GPG key files found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation is intentionally disabled; review the failed resources and apply approved changes.'
}
