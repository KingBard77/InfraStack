#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd Banner is configured"
function check {
    STATUS="Fail"

    if sshd -T 2>/dev/null | awk '$1 == "banner" && $2 != "none" && $2 != "" { found=1 } END { exit found ? 0 : 1 }'; then
        STATUS="Pass"
    else
        STATUS="Fail: sshd Banner is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")
    touch /etc/issue.net
    sed -i '/^\s*Banner\s\+/d' /etc/ssh/sshd_config
    echo 'Banner /etc/issue.net' | tee -a /etc/ssh/sshd_config > /dev/null
    systemctl reload sshd 2>/dev/null || systemctl reload ssh 2>/dev/null || true
}
