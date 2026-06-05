#!/bin/bash

CRITICALITY=2
TITLE="Ensure events that modify user/group information are collected"
function check {
    STATUS="Pass"

    if ! grep -RE identity /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-3-3-8.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-w /etc/group -p wa -k identity
-w /etc/passwd -p wa -k identity
-w /etc/gshadow -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/security/opasswd -p wa -k identity
CIS_RULES
    augenrules --load
}
