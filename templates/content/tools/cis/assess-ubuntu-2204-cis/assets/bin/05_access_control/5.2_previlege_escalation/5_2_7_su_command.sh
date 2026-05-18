#!/bin/sh

CRITICALITY=1
TITLE="Ensure access to the su command is restricted"

function check {
    STATUS="Pass"

    if ! grep -q "auth required pam_wheel.so use_uid group=sugroup" /etc/pam.d/su; then
        STATUS="Fail"
    fi

    echo "Check status: $STATUS"
}

function fix {

    groupadd sugroup

    cp -a /etc/pam.d/su /etc/pam.d/su.$(date +"%s")

    echo "auth required pam_wheel.so use_uid group=sugroup" | tee -a /etc/pam.d/su > /dev/null

    systemctl restart sshd
}