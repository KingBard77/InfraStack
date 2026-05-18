#!/bin/sh

CRITICALITY=1
TITLE="Ensure password failed attempts lockout includes root account"

even_deny_root="1"
root_unlock_time="60"

function check {
    STATUS="Fail"

    if grep -qE "^even_deny_root\s+${even_deny_root}" /etc/security/faillock.conf && \
       grep -qE "^root_unlock_time\s+${root_unlock_time}" /etc/security/faillock.conf; then
        STATUS="Pass"
    else
        echo "Failed: even_deny_root or root_unlock_time is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/security/faillock.conf /etc/security/faillock.conf.$(date +"%s").bak

    sed -i '/^\s*even_deny_root\s*/d' /etc/security/faillock.conf
    sed -i '/^\s*root_unlock_time\s*/d' /etc/security/faillock.conf

    echo "even_deny_root ${even_deny_root}" | tee -a /etc/security/faillock.conf > /dev/null
    echo "root_unlock_time ${root_unlock_time}" | tee -a /etc/security/faillock.conf > /dev/null

}