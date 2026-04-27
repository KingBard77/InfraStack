#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit configuration files belong to group root"

function check {
    STATUS="Pass"

    if find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) ! -group root | grep . > /dev/null 2>&1; then
        STATUS="Fail: Audit configuration files do not belong to group root"
    fi

    echo "Check status: $STATUS"
}

function fix {
    find /etc/audit -maxdepth 2 -type f \( -name '*.conf' -o -name '*.rules' \) -exec chgrp root {} +
}
