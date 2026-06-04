#!/bin/bash

CRITICALITY=2
TITLE="Ensure file deletion events by users are collected"
function check {
    STATUS="Pass"

    if ! grep -RE delete /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-3-3-13.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-a always,exit -F arch=b64 -S rename,unlink,unlinkat,renameat -F auid!=unset -k delete
-a always,exit -F arch=b32 -S rename,unlink,unlinkat,renameat -F auid!=unset -k delete
CIS_RULES
    augenrules --load
}
