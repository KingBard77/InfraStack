#!/bin/bash

CRITICALITY=2
TITLE="Ensure events that modify the system's Mandatory Access Controls are collected"
function check {
    STATUS="Pass"

    if ! grep -RE MAC-policy /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-2-3-14.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-w /etc/apparmor -p wa -k MAC-policy
-w /etc/apparmor.d -p wa -k MAC-policy
CIS_RULES
    augenrules --load
}
