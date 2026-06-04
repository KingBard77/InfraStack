#!/bin/bash

CRITICALITY=1
TITLE="Ensure Automatic Error Reporting is not enabled"

function check {
    STATUS="Pass"

    if [ -f /etc/default/apport ] && grep -Eq '^[[:space:]]*enabled[[:space:]]*=[[:space:]]*1[[:space:]]*$' /etc/default/apport; then
        STATUS="Fail: apport is enabled"
    fi

    if systemctl list-unit-files 2>/dev/null | grep -q '^whoopsie.service'; then
        if systemctl is-enabled whoopsie.service 2>/dev/null | grep -vqE 'disabled|masked|static'; then
            STATUS="Fail: whoopsie.service is enabled"
        fi

        if systemctl is-active whoopsie.service 2>/dev/null | grep -q '^active$'; then
            STATUS="Fail: whoopsie.service is active"
        fi
    fi

    if systemctl list-unit-files 2>/dev/null | grep -q '^apport.service'; then
        if systemctl is-enabled apport.service 2>/dev/null | grep -vqE 'disabled|masked|static'; then
            STATUS="Fail: apport.service is enabled"
        fi

        if systemctl is-active apport.service 2>/dev/null | grep -q '^active$'; then
            STATUS="Fail: apport.service is active"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f /etc/default/apport ]; then
        sed -i '/^[[:space:]]*enabled[[:space:]]*=/d' /etc/default/apport
        printf '%s\n' 'enabled=0' >> /etc/default/apport
    fi

    if systemctl list-unit-files 2>/dev/null | grep -q '^whoopsie.service'; then
        systemctl stop whoopsie.service
        systemctl disable whoopsie.service
        systemctl mask whoopsie.service
    fi

    if systemctl list-unit-files 2>/dev/null | grep -q '^apport.service'; then
        systemctl stop apport.service
        systemctl disable apport.service
        systemctl mask apport.service
    fi
}
