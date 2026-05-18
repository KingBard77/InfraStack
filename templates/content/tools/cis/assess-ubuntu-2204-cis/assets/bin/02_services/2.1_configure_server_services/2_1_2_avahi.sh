#!/bin/bash

CRITICALITY=1
TITLE="Ensure avahi services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' avahi-daemon 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: avahi-demon is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop avahi-daemon.socket avahi-daemon.service
    apt purge avahi-daemon
    systemctl stop avahi-daemon.socket avahi-daemon.service
    systemctl mask avahi-daemon.socket avahi-daemon.service
}
