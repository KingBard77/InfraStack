#!/bin/bash

CRITICALITY=1
TITLE="Ensure password quality is enforced for the root user"
function check {
    KEY="enforce_for_root"
    STATUS="Fail"

    if grep -RE "^\s*$KEY\b" /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: $KEY is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    touch /etc/security/pwquality.conf
    cp -a /etc/security/pwquality.conf /etc/security/pwquality.conf.$(date +"%s")
    sed -i "/^\s*$KEY\b/d" /etc/security/pwquality.conf
    echo "$KEY" | tee -a /etc/security/pwquality.conf > /dev/null
}
