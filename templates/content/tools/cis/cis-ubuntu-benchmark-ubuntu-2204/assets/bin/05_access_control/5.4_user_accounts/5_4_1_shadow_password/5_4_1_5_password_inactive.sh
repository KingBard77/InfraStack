#!/bin/sh

CRITICALITY=1
TITLE="Ensure inactive password lock is configured"

INACTIVE_PERIOD=45

function check {
    STATUS="Fail"

    DEFAULT_INACTIVE_PERIOD=$(useradd -D | grep INACTIVE | awk -F= '{print $2}')
    if [ "$DEFAULT_INACTIVE_PERIOD" -le "$INACTIVE_PERIOD" ]; then
        STATUS="Pass"
    else
        echo "Failed: INACTIVE_PERIOD is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    useradd -D -f $INACTIVE_PERIOD
    
    awk -F: '($2!~/^!$/ && $2!~/^\*$/) {if($7 > 45 || $7 < 0)system ("chage --inactive 45 " $1)}' /etc/shadow
}