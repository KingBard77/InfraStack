#!/bin/bash

CRITICALITY=1
TITLE="Ensure world writable files and directories are secured"
function check {
    STATUS="Pass"

    if find / -xdev \( -type f -perm -0002 -o -type d -perm -0002 ! -perm -1000 \) -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: world writable files or directories are not secured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    find / -xdev -type f -perm -0002 -exec chmod o-w {} \; 2>/dev/null
    find / -xdev -type d -perm -0002 ! -perm -1000 -exec chmod +t {} \; 2>/dev/null
}
