#!/bin/bash

CRITICALITY=2
TITLE="Ensure login and logout events are collected"
function check {
    STATUS="Pass"

    if ! grep -RE logins /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-3-3-12.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-w /var/log/lastlog -p wa -k logins
-w /var/run/faillock -p wa -k logins
CIS_RULES
    augenrules --load
}
