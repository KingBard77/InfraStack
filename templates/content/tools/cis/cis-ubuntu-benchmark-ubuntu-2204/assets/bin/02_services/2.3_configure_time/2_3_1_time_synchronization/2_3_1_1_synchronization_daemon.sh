#!/bin/bash

CRITICALITY=1
TITLE="Ensure a single time synchronization daemon is in use"

function check {
    STATUS="Fail"

    if ! dpkg-query -l chrony > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: chrony is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt install chrony
    systemctl stop systemd-timesyncd.service
    systemctl mask systemd-timesyncd.service

    apt purge chrony
    apt autoremove chrony
}
