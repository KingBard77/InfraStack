#!/bin/bash

CRITICALITY=1
TITLE='Ensure package manager repositories are properly configured'

function check {
    STATUS="Fail"

    if command -v apt-cache > /dev/null 2>&1 && apt-cache policy nginx 2>/dev/null | awk '/Candidate:/ && $2 != "(none)" { found=1 } END { exit !found }'; then
        STATUS="Pass"
    elif command -v dnf > /dev/null 2>&1 && dnf -q info nginx > /dev/null 2>&1; then
        STATUS="Pass"
    elif command -v yum > /dev/null 2>&1 && yum -q info nginx > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: package manager cannot resolve nginx"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated NGINX remediation is intentionally disabled; update nginx configuration after reviewing the failed directive.'
}
