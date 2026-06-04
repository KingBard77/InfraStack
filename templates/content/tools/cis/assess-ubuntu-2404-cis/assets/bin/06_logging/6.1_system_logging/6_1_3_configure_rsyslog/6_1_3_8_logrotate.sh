#!/bin/bash

CRITICALITY=1
TITLE='Ensure logrotate is configured'

function check {
    STATUS="Pass"

    if [[ ! -f /etc/logrotate.conf ]] || ! grep -R '^[^#].*rotate' /etc/logrotate.conf /etc/logrotate.d 2>/dev/null | grep -q .; then
        STATUS="Fail: logrotate rotation policy was not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! dpkg-query -W -f='${Status}' logrotate 2>/dev/null | grep -q 'install ok installed'; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y logrotate
    fi

    {
        printf '%s\n' '/var/log/*.log {'
        printf '%s\n' '    daily'
        printf '%s\n' '    rotate 7'
        printf '%s\n' '    missingok'
        printf '%s\n' '    notifempty'
        printf '%s\n' '    compress'
        printf '%s\n' '    delaycompress'
        printf '%s\n' '    create 0640 root adm'
        printf '%s\n' '}'
    } > /etc/logrotate.d/cis-system-logs
}
