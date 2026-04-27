#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit configuration files are mode 0640 or less permissive"

function check {
    STATUS="Pass"

    if find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) -perm /0137 | grep . > /dev/null 2>&1; then
        STATUS="Fail: Audit configuration files are too permissive"
    fi

    echo "Check status: $STATUS"
}

function fix {
    find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) -exec chmod u=rw,g=r,o= {} +
}
