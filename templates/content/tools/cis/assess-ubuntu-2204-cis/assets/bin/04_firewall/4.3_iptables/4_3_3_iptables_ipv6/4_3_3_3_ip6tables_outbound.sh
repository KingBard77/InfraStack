#!/bin/sh

CRITICALITY=1
TITLE="Ensure ip6tables outbound and established connections are configured"

function check {
    STATUS="Pass"

    if ! ip6tables -S OUTPUT 2>/dev/null | grep -Eq 'ctstate (ESTABLISHED|RELATED|NEW)|state (ESTABLISHED|RELATED|NEW)'; then
        STATUS="Fail: ip6tables outbound and established rules were not found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v ip6tables > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y iptables
    fi

    ip6tables -C OUTPUT -o lo -j ACCEPT 2>/dev/null || ip6tables -A OUTPUT -o lo -j ACCEPT
    ip6tables -C OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT 2>/dev/null || ip6tables -A OUTPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
    ip6tables -C OUTPUT -m conntrack --ctstate NEW -j ACCEPT 2>/dev/null || ip6tables -A OUTPUT -m conntrack --ctstate NEW -j ACCEPT
}
