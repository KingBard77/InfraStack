#!/bin/bash

CRITICALITY=1
TITLE="Ensure root user umask is configured"
function check {
    STATUS="Fail"

    if grep -RE '^\s*umask\s+0?27\b' /root/.bashrc /root/.profile /root/.bash_profile /etc/profile /etc/profile.d/*.sh > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: root umask is not configured to 027"
    fi

    echo "Check status: $STATUS"
}

function fix {
    touch /root/.bashrc
    cp -a /root/.bashrc /root/.bashrc.$(date +"%s")
    sed -i '/^\s*umask\s\+/d' /root/.bashrc
    echo 'umask 027' | tee -a /root/.bashrc > /dev/null
}
