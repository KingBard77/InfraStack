#!/bin/bash

CRITICALITY=2
TITLE="Ensure the audit configuration is immutable"
function check {
    STATUS="Pass"

    if ! grep -RE '^-e[[:space:]]+2' /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-2-3-20.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-e 2
CIS_RULES
    augenrules --load
}
