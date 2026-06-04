#!/bin/sh

CRITICALITY=1
TITLE="Ensure iptables outbound and established connections are configured"

function check {
    STATUS="Pass"

    if ! iptables -S OUTPUT 2>/dev/null | grep -Eq 'ctstate (ESTABLISHED|RELATED|NEW)|state (ESTABLISHED|RELATED|NEW)'; then
        STATUS="Fail: iptables outbound and established rules were not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v iptables > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y iptables
    fi

    iptables -C OUTPUT -o lo -j ACCEPT 2>/dev/null || iptables -A OUTPUT -o lo -j ACCEPT
    iptables -C OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT 2>/dev/null || iptables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    iptables -C OUTPUT -m conntrack --ctstate NEW -j ACCEPT 2>/dev/null || iptables -A OUTPUT -m conntrack --ctstate NEW -j ACCEPT
}
