#!/bin/bash

CRITICALITY=2
TITLE="Ensure GDM is removed"

function check {
    STATUS="Fail"

    if ! dpkg-query -l gdm3 > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: gdm3 is installed"
    fi

    echo "Check status: $STATUS"
}


function fix {
    apt purge gdm3
    apt autoremove gdm3
}
