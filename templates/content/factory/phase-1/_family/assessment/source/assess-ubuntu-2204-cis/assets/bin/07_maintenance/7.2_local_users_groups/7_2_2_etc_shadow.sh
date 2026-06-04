#!/bin/bash

CRITICALITY=1
TITLE="Ensure /etc/shadow password fields are not empty"
function check {
    STATUS="Pass"

    if awk -F: '($2 == "") { print $1 }' /etc/shadow | grep -q .; then
        STATUS="Fail: /etc/shadow contains empty password fields"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires choosing whether to lock or remove affected accounts.'
}
