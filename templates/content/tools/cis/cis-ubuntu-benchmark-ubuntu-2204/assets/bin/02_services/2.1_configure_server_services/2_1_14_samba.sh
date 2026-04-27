#!/bin/bash

CRITICALITY=1
TITLE="Ensure samba services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' samba 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: samba is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop smbd.service
    apt purge samba
    systemctl stop smbd.service
    systemctl mask smbd.service
}
