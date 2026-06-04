#!/bin/bash

CRITICALITY=1
TITLE='Ensure updates, patches, and additional security software are installed'

function check {
    STATUS="Pass"

    if apt list --upgradable 2>/dev/null | sed '1d' | grep -q .; then
        STATUS="Fail: package updates are available"
    fi

    echo "Check status: $STATUS"
}

function fix {
    apt-get update
    DEBIAN_FRONTEND=noninteractive apt-get -y upgrade
}
