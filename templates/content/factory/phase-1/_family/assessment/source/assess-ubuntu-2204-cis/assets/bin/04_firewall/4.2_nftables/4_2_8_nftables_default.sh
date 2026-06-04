#!/bin/bash

CRITICALITY=1
TITLE="Ensure nftables default deny firewall policy"


function check {
    STATUS="Fail"

    INPUT_POLICY=$(sudo nft list ruleset | awk '/hook input/,/}/' | grep -o 'policy drop')
    FORWARD_POLICY=$(sudo nft list ruleset | awk '/hook forward/,/}/' | grep -o 'policy drop')
    OUTPUT_POLICY=$(sudo nft list ruleset | awk '/hook output/,/}/' | grep -o 'policy drop')

    if [[ "$INPUT_POLICY" == "policy drop" && "$FORWARD_POLICY" == "policy drop" && "$OUTPUT_POLICY" == "policy drop" ]]; then
        STATUS="Pass"
    else
        STATUS="Fail: Default deny policy is not set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Manual: nftables default-deny policy needs approved allow rules before enforcement.'
}
