#!/bin/bash

CRITICALITY=1
TITLE="Ensure rpcbind services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' rpcbind 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: rpcbind is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop rpcbind.socket rpcbind.service
    apt purge rpcbind
    systemctl stop rpcbind.socket rpcbind.service
    systemctl mask rpcbind.socket rpcbind.service
}
