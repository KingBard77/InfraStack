#!/bin/bash

CRITICALITY=2
TITLE="Ensure all AppArmor Profiles are enforcing"

function check {
    STATUS="Pass"

    if ! command -v apparmor_status > /dev/null 2>&1; then
        STATUS="Fail: apparmor_status is not available"
    elif ! apparmor_status | grep -Eq 'profiles are (in enforce|in complain) mode'; then
        STATUS="Fail: no AppArmor profiles are in enforce or complain mode"
    elif apparmor_status | grep -Eq '^[[:space:]]*[1-9][0-9]* processes are unconfined'; then
        STATUS="Fail: one or more processes are unconfined"
    elif apparmor_status | grep -Eq '^[[:space:]]*[1-9][0-9]* profiles are in complain mode'; then
        STATUS="Fail: one or more AppArmor profiles are in complain mode"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! dpkg-query -W -f='${Status}' apparmor-utils 2>/dev/null | grep -q 'install ok installed'; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y apparmor apparmor-utils
    fi

    systemctl enable --now apparmor 2>/dev/null || true
    if compgen -G "/etc/apparmor.d/*" > /dev/null; then
        aa-enforce /etc/apparmor.d/* 2>/dev/null || true
    fi
}
