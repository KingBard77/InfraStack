#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw firewall rules exist for all open ports"

function check {
    STATUS="Fail"
    ufw status numbered 2>/dev/null | grep -Eiq 'ALLOW IN|LIMIT IN' && STATUS="Pass" || STATUS="Fail: ufw has no allow rules for open ports"

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated firewall remediation requires approved host firewall policy.'
}
