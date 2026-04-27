#!/bin/sh

CRITICALITY=1
TITLE="Ensure the audit configuration is immutable"

RULE_FILE="/etc/audit/rules.d/99-finalize.rules"

function check {
    STATUS="Fail"

    if grep -F -- "-e 2" /etc/audit/rules.d/*.rules > /dev/null 2>&1 && auditctl -s | grep -Eq 'enabled[[:space:]]+2' > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: Audit immutability is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$RULE_FILE" ]; then
        cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    fi

    cat <<'EOF' > "$RULE_FILE"
-e 2
EOF

    augenrules --load

    if auditctl -s | grep -Eq 'enabled[[:space:]]+2' > /dev/null 2>&1; then
        echo "Reboot required to load rules"
    fi
}
