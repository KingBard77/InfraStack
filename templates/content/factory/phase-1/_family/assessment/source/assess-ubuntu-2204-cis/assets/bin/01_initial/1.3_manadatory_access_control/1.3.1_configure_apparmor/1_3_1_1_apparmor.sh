#!/bin/bash

CRITICALITY=1
TITLE="Ensure AppArmor is installed"

function check {
    STATUS="Fail"

    if ! dpkg-query -W -f='${Package}\t${db:Status-Status}\n' apparmor apparmor-utils | grep -E 'not-installed' > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Fail: One or both package not-installed"
    fi

    echo "Check status: $STATUS"
}


function fix {
    apt install apparmor apparmor-utils -y
}