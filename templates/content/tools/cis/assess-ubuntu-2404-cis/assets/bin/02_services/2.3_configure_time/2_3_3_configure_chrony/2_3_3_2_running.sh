#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is running as user _chrony"
function check {
    STATUS="Fail"

    if ps -eo user=,comm=,args= | awk '$2 == "chronyd" && $1 == "_chrony" { found=1 } END { exit found ? 0 : 1 }'; then
        STATUS="Pass"
    elif grep -RE '^\s*user\s+_chrony\b' /etc/chrony/chrony.conf /etc/chrony/conf.d/*.conf > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: chrony is not running as _chrony"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/chrony/chrony.conf /etc/chrony/chrony.conf.$(date +"%s")
    sed -i '/^\s*user\s\+/d' /etc/chrony/chrony.conf
    echo 'user _chrony' | tee -a /etc/chrony/chrony.conf > /dev/null
    systemctl restart chrony
}
