#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables outbound and established connections are configured"

function check {
    STATUS="Fail"

    INPUT_ESTABLISHED_EXISTS=$(sudo nft list ruleset | awk '/hook input/,/}/' | grep -E 'ip protocol (tcp|udp|icmp) ct state established accept' | wc -l)
    OUTPUT_NEW_RELATED_ESTABLISHED_EXISTS=$(sudo nft list ruleset | awk '/hook output/,/}/' | grep -E 'ip protocol (tcp|udp|icmp) ct state (new,related,)?established accept' | wc -l)

    if [ "$INPUT_ESTABLISHED_EXISTS" -ge 3 ] && [ "$OUTPUT_NEW_RELATED_ESTABLISHED_EXISTS" -ge 3 ]; then
        STATUS="Pass: Outbound and established connection rules are configured"
    else
        STATUS="Fail: One or more outbound or established connection rules are missing"
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
    PROTOCOLS=(tcp udp icmp)

    for PROTO in "${PROTOCOLS[@]}"; do
        nft list chain inet filter input | grep -Eiq "ip protocol $PROTO ct state established accept" || nft add rule inet filter input ip protocol "$PROTO" ct state established accept
        nft list chain inet filter output | grep -Eiq "ip protocol $PROTO ct state new,related,established accept" || nft add rule inet filter output ip protocol "$PROTO" ct state new,related,established accept
    done
}
