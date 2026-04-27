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
    echo "Manual"

    protocols=("tcp" "udp" "icmp")
    for proto in "${protocols[@]}"; do
        nft add rule inet filter input ip protocol "$proto" ct state established accept
        nft add rule inet filter output ip protocol "$proto" ct state new,related,established accept
    done

    # nft add rule inet filter input ip protocol tcp ct state established accept 
    # nft add rule inet filter input ip protocol udp ct state established accept
    # nft add rule inet filter input ip protocol icmp ct state established accept
    # nft add rule inet filter output ip protocol tcp ct state new,related,established accept
    # nft add rule inet filter output ip protocol udp ct state new,related,established accept
    # nft add rule inet filter output ip protocol icmp ct state new,related,established accept
}