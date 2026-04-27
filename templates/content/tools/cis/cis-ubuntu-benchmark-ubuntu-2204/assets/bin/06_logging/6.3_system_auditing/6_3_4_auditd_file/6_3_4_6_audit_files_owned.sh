#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit configuration files are owned by root"

function check {
    STATUS="Pass"

    if find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) ! -user root | grep . > /dev/null 2>&1; then
        STATUS="Fail: Audit configuration files are not owned by root"
    fi

    echo "Check status: $STATUS"
}

function fix {
    find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) -exec chown root {} +
}
