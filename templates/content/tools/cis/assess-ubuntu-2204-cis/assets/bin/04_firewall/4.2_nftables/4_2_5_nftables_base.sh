#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables base chains exist"

function check {
    STATUS="Fail"

    INPUT_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook input')
    FORWARD_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook forward')
    OUTPUT_CHAIN_EXISTS=$(nft list ruleset | grep -c 'hook output')

    if [ "$INPUT_CHAIN_EXISTS" -gt 0 ] && [ "$FORWARD_CHAIN_EXISTS" -gt 0 ] && [ "$OUTPUT_CHAIN_EXISTS" -gt 0 ]; then
        STATUS="Pass"
    else
        STATUS="Fail: One or more base chains are missing"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
    echo "nft create chain inet <table_name> <base_chain_name> { type filter hook <input|forward|output> priority 0 \; }"
}