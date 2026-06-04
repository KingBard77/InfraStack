#!/bin/bash

CRITICALITY=1
TITLE='Ensure NGINX is installed'

function check {
    STATUS="Fail"

    if command -v nginx > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: nginx is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if command -v apt-get > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y nginx
    elif command -v dnf > /dev/null 2>&1; then
        dnf install -y nginx
    elif command -v yum > /dev/null 2>&1; then
        yum install -y nginx
    else
        echo "No supported package manager found for nginx installation"
        return 1
    fi

    if command -v systemctl > /dev/null 2>&1; then
        systemctl enable --now nginx 2>/dev/null || true
    fi
}
