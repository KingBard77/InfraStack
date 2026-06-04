#!/bin/bash

CRITICALITY=1
TITLE="Ensure ftp server services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' vsftpd 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: vsftpd is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop vsftpd.service
    apt purge vsftpd
    systemctl stop vsftpd.service
    systemctl mask vsftpd.service
}
