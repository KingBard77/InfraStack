#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables loopback traffic is configured"

function check {
    STATUS="Fail"
    RULESET="$(nft list ruleset 2>/dev/null)"

    if printf '%s
' "$RULESET" | grep -Eiq 'iif[[:space:]]+"?lo"?[[:space:]]+accept' \
        && printf '%s
' "$RULESET" | grep -Eiq 'ip saddr 127\.0\.0\.0/8.*drop' \
        && printf '%s
' "$RULESET" | grep -Eiq 'ip6 saddr ::1.*drop'; then
        STATUS="Pass"
    else
        STATUS="Fail: One or more loopback traffic rules are missing"
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
    nft list chain inet filter input > /dev/null 2>&1 || nft add chain inet filter input '{ type filter hook input priority 0 ; policy accept ; }'
    nft list chain inet filter forward > /dev/null 2>&1 || nft add chain inet filter forward '{ type filter hook forward priority 0 ; policy accept ; }'
    nft list chain inet filter output > /dev/null 2>&1 || nft add chain inet filter output '{ type filter hook output priority 0 ; policy accept ; }'
    nft list chain inet filter input | grep -Eiq 'iif[[:space:]]+"?lo"?[[:space:]]+accept' || nft add rule inet filter input iif lo accept
    nft list chain inet filter output | grep -Eiq 'oif[[:space:]]+"?lo"?[[:space:]]+accept' || nft add rule inet filter output oif lo accept
    nft list chain inet filter input | grep -Eiq 'ip saddr 127\.0\.0\.0/8.*drop' || nft add rule inet filter input ip saddr 127.0.0.0/8 counter drop
    nft list chain inet filter input | grep -Eiq 'ip6 saddr ::1.*drop' || nft add rule inet filter input ip6 saddr ::1 counter drop
}
