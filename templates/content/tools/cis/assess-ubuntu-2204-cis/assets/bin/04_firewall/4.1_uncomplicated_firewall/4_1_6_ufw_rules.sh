#!/bin/bash

CRITICALITY=1
TITLE="Ensure ufw firewall rules exist for all open ports"

function check {
    STATUS="Fail"

    #for PORT in $(ssnetstat -ln | grep LISTEN\ | awk '{ print $4 }' | rev | cut -d':' -f1 | rev | sort | uniq); do
    for PORT in $(ss -ln | grep -E "^tcp|^udp" | grep LISTEN\ | awk '{ print $5 }' | rev | cut -d':' -f1 | rev | sort | uniq); do
        iptables -L INPUT -v -n | grep ":$PORT\ " 2>&1  > /dev/null
        if [ $? != 0 ]; then
            STATUS="Fail"   
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
}
