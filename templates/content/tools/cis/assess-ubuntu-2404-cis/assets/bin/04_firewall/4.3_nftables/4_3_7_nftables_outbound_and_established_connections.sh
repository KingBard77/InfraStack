#!/bin/bash

CRITICALITY=1
TITLE='Ensure nftables outbound and established connections are configured'

function check {
    STATUS="Pass"
    RULESET="$(nft list ruleset 2>/dev/null)"

    if [[ -z "$RULESET" ]] || ! printf '%s\n' "$RULESET" | grep -Eiq 'ct state.*(established|related).*accept' || ! printf '%s\n' "$RULESET" | grep -Eiq 'oif|output'; then
        STATUS="Fail: nftables outbound and established connection rules were not found"
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
    nft list chain inet filter output > /dev/null 2>&1 || nft add chain inet filter output '{ type filter hook output priority 0 ; policy accept ; }'
    nft list chain inet filter output | grep -Eiq 'ct state.*(established|related).*accept' || nft add rule inet filter output ct state established,related accept
    nft list chain inet filter output | grep -Eiq 'oif[[:space:]]+"?lo"?[[:space:]]+accept' || nft add rule inet filter output oif lo accept
}
