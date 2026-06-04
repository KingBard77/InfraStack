#!/bin/bash

CRITICALITY=1
TITLE="Ensure sudo is installed"

function check {
    STATUS="Fail"

    if dpkg-query -l | grep sudo; then
        STATUS="Pass"
        echo "sudo is installed"
    else
        echo "sudo is not installed"
    fi

    echo "Check status: $STATUS"
}

function fix {
   	apt update

    read -p "Is LDAP functionality required? (yes/no): " LDAP_REQUIRED

    if [ "$LDAP_REQUIRED" = "yes" ]; then
        apt install -y sudo-ldap
    else
        apt install -y sudo
    fi
}
