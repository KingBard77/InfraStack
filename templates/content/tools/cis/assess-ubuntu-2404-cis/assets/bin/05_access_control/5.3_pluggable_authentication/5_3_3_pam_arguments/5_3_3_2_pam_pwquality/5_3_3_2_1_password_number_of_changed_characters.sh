#!/bin/bash

CRITICALITY=1
TITLE="Ensure password number of changed characters is configured"
function check {
    KEY="difok"
    STATUS="Fail"

    VALUE="$(awk -F= -v key="$KEY" '$1 ~ "^[[:space:]]*" key "[[:space:]]*$" { gsub(/[[:space:]]/, "", $2); print $2 }' /etc/security/pwquality.conf /etc/security/pwquality.conf.d/*.conf 2>/dev/null | tail -n 1)"
    if [[ "$VALUE" =~ ^[0-9]+$ && "$VALUE" -ge 2 ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: $KEY is not configured to 2"
    fi

    echo "Check status: $STATUS"
}

function fix {
    touch /etc/security/pwquality.conf
    cp -a /etc/security/pwquality.conf /etc/security/pwquality.conf.$(date +"%s")
    sed -i "/^\s*$KEY\s*=/d" /etc/security/pwquality.conf
    echo "$KEY = 2" | tee -a /etc/security/pwquality.conf > /dev/null
}
