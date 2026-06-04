#!/bin/bash

CRITICALITY=1
TITLE="Ensure message access server services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' devecot-pop3d devecot-imagp 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Fail: devecot-pop3d devecot-imagp is installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop dovecot.socket dovecot.service
    apt purge dovecot-imapd dovecot-pop3d
    systemctl stop dovecot.socket dovecot.service
    systemctl mask dovecot.socket dovecot.service
}
