#!/bin/bash

CRITICALITY=2
TITLE="Ensure successful and unsuccessful attempts to use the chcon command are collected"
function check {
    STATUS="Pass"

    if ! grep -RE chcon /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-2-3-15.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-a always,exit -F path=/usr/bin/chcon -F perm=x -F auid!=unset -k perm_chng
CIS_RULES
    augenrules --load
}
