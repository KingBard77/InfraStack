#!/bin/bash

CRITICALITY=1
TITLE="Ensure mail transfer agent is configured for local-only mode"

function check {
    STATUS="Pass"
    PORT_LIST=("25" "465" "587")

    if [ "$(postconf -n inet_interfaces)" != "inet_interfaces = loopback-only" ]; then
        STATUS="Fail"
    else
        for port in "${PORT_LIST[@]}"; do
            if ss -plntu | grep -P -- ":$port\b" | grep -Pvq -- '\h+(127\.0\.0\.1|\[?::1\]?):'"$port"'\b'; then
                # echo "Port $port is listening on a non-loopback network interface"
                STATUS="Fail"
            fi
        done
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/postfix/main.cf /etc/postfix/main.cf.$(date +"%s")

    sed -i '/^\s*inet_interfaces\s*=/d' /etc/postfix/main.cf

    echo "inet_interfaces = loopback-only" | tee -a /etc/postfix/main.cf > /dev/null

    systemctl restart postfix
}
