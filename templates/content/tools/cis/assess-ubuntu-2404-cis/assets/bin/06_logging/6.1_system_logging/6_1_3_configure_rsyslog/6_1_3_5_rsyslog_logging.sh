#!/bin/bash

CRITICALITY=1
TITLE='Ensure rsyslog logging is configured'

function check {
    STATUS="Pass"

    if ! grep -R '^[^#].*[[:space:]]/var/log/' /etc/rsyslog.conf /etc/rsyslog.d 2>/dev/null | grep -q .; then
        STATUS="Fail: rsyslog local logging rules were not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! dpkg-query -W -f='${Status}' rsyslog 2>/dev/null | grep -q 'install ok installed'; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y rsyslog
    fi

    {
        printf '%s\n' 'auth,authpriv.* /var/log/auth.log'
        printf '%s\n' '*.*;auth,authpriv.none /var/log/syslog'
    } > /etc/rsyslog.d/60-cis-local-logging.conf

    systemctl enable --now rsyslog 2>/dev/null || true
    systemctl restart rsyslog 2>/dev/null || true
}
