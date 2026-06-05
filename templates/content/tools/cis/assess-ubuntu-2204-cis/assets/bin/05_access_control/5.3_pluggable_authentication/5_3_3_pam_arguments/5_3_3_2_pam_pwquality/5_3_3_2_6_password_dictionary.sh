#!/bin/bash

CRITICALITY=1
TITLE="Ensure password dictionary check is enabled"
function check {
    KEY="dictcheck"
    STATUS="Fail"

    VALUE="$(awk -F= -v key="$KEY" '$1 ~ "^[[:space:]]*" key "[[:space:]]*$" { gsub(/[[:space:]]/, "", $2); print $2 }' /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf 2>/dev/null | tail -n 1)"
    if [[ "$VALUE" == "1" ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: $KEY is not configured to 1"
    fi

    echo "Check status: $STATUS"
}

function fix {
    touch /etc/security/pwquality.conf
    cp -a /etc/security/pwquality.conf /etc/security/pwquality.conf.$(date +"%s")
    sed -i "/^\s*$KEY\s*=/d" /etc/security/pwquality.conf
    echo "$KEY = 1" | tee -a /etc/security/pwquality.conf > /dev/null
}
