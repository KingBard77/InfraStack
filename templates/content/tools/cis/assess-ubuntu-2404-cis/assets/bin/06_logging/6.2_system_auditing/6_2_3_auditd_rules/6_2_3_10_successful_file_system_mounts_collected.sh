#!/bin/bash

CRITICALITY=2
TITLE="Ensure successful file system mounts are collected"
function check {
    STATUS="Pass"

    if ! grep -RE mounts /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-2-3-10.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-a always,exit -F arch=b64 -S mount -F auid!=unset -k mounts
-a always,exit -F arch=b32 -S mount -F auid!=unset -k mounts
CIS_RULES
    augenrules --load
}
