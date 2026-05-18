#!/bin/bash

CRITICALITY=1
TITLE="Ensure network file system services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' nfs-kernel-server 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: nfs-kernel-server is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop nfs-server.service
    apt purge nfs-kernel-server
    systemctl stop nfs-server.service
    systemctl mask nfs-server.service
}
