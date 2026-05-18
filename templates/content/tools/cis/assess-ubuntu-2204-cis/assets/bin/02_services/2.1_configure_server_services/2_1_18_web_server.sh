#!/bin/bash

CRITICALITY=1
TITLE="Ensure web server services are not in use"

function check {
    STATUS="Pass"

    if dpkg-query -W -f='${Status}' apache2 nginx 2>/dev/null | grep -q "install ok installed"; then
        STATUS="Pass"
    fi

    echo "Check status: $STATUS"
}

function fix {
    systemctl stop apache2.socket httpd.service nginx.service
    apt purge apache2 nginx
    systemctl stop apache2.socket apache2.service nginx.service
    systemctl mask apache2.socket apache2.service nginx.service
}
