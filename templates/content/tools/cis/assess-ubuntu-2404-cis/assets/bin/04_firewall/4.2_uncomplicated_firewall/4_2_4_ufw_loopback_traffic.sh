#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw loopback traffic is configured"

function check {
    STATUS="Fail"
    
    UFW_STATUS=$(ufw status verbose)
    
    if echo "$UFW_STATUS" | grep -q "ALLOW IN" | grep -q "Anywhere on lo" && 
       echo "$UFW_STATUS" | grep -q "ALLOW OUT" | grep -q "Anywhere on lo" &&
       echo "$UFW_STATUS" | grep -q "DENY IN" | grep -q "127.0.0.0/8" &&
       echo "$UFW_STATUS" | grep -q "DENY IN" | grep -q "::1" &&
       echo "$UFW_STATUS" | grep -q "ALLOW OUT" | grep -q "Anywhere (v6) on lo" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: UFW loopback traffic is not configured correctly"
    fi

    echo "Check status: $STATUS"
}

function fix {
    ufw allow in on lo
    ufw allow out on lo
    ufw deny in from 127.0.0.0/8
    ufw deny in from ::1
    ufw allow out on lo
    ufw allow out from anywhere to anywhere port 80,443 proto tcp
}
