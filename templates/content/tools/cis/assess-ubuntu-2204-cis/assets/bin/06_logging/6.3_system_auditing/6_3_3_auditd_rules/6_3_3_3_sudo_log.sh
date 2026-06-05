#!/bin/bash

CRITICALITY=2
TITLE="Ensure events that modify the sudo log file are collected"
function check {
    STATUS="Pass"

    if ! grep -RE sudo_log_file /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-3-3-3.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-w /var/log/sudo.log -p wa -k sudo_log_file
CIS_RULES
    augenrules --load
}
