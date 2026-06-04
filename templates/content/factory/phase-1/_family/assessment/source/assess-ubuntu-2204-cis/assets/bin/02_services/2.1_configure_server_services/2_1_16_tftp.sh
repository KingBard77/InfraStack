#!/bin/bash

CRITICALITY=1
TITLE="Ensure tftp services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' tftpd-hpa 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: tftp is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop tftpd-hpa.service
    apt purge tftpd-hpa
    systemctl stop tftpd-hpa.service
    systemctl mask tftpd-hpa.service
}
