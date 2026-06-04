#!/bin/bash

CRITICALITY=2
TITLE="Ensure successful and unsuccessful attempts to use the usermod command are collected"
function check {
    STATUS="Pass"

    if ! grep -RE usermod /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-2-3-18.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-a always,exit -F path=/usr/sbin/usermod -F perm=x -F auid!=unset -k usermod
CIS_RULES
    augenrules --load
}
