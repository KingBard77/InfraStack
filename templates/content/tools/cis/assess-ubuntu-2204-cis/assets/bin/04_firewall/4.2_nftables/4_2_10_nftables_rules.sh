#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables rules are permanent"

function check {
    STATUS="Fail"

    if [[ -s /etc/nftables.conf ]] && grep -Eq 'table[[:space:]]+inet[[:space:]]+filter' /etc/nftables.conf; then
        STATUS="Pass"
    else
        STATUS="Fail: nftables rules are not persisted in /etc/nftables.conf"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if ! command -v nft > /dev/null 2>&1; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y nftables
    fi

    systemctl enable --now nftables 2>/dev/null || true
    nft list table inet filter > /dev/null 2>&1 || nft add table inet filter
    nft list ruleset > /etc/nftables.conf
    systemctl enable nftables 2>/dev/null || true
}
