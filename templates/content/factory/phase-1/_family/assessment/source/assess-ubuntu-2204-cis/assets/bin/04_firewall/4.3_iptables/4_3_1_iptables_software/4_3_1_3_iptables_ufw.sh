#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw is uninstalled or disabled with iptables"

function check {
    STATUS="Fail"

    if dpkg-query -W -f='${binary:Package}\t${Status}\t${db:Status-Status}\n' ufw | grep -q '^ufw'; then
        if systemctl is-active ufw | grep -F 'active' > /dev/null 2>&1; then
            STATUS="Fail: UFW is installed and enabled"
        else
            STATUS="Pass: UFW is installed but not active"
        fi
    else
        STATUS="Pass: UFW is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    ufw disable
    systemctl stop ufw
    systemctl mask ufw
    apt purge -y ufw
}