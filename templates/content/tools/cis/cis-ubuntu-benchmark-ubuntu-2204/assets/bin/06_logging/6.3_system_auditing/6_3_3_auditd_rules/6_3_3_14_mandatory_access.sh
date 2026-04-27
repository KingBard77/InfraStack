#!/bin/sh

CRITICALITY=1
TITLE="Ensure AppArmor policy changes are collected"

RULE_FILE="/etc/audit/rules.d/50-6.3.3.14-mac-policy.rules"

function check {
    STATUS="Pass"

    while IFS= read -r RULE; do
        if [ -z "$RULE" ]; then
            continue
        fi

        if ! grep -F -- "$RULE" /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
            STATUS="Fail: AppArmor audit rules are missing"
            echo "Check status: $STATUS"
            return
        fi

        if ! auditctl -l | grep -F -- "$RULE" > /dev/null 2>&1; then
            STATUS="Fail: AppArmor audit rules are missing"
            echo "Check status: $STATUS"
            return
        fi
    done <<'EOF'
-w /etc/apparmor/ -p wa -k MAC_policy
-w /etc/apparmor.d/ -p wa -k MAC_policy
EOF

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$RULE_FILE" ]; then
        cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    fi

    cat <<'EOF' > "$RULE_FILE"
-w /etc/apparmor/ -p wa -k MAC_policy
-w /etc/apparmor.d/ -p wa -k MAC_policy
EOF

    augenrules --load

    if auditctl -s | grep -Eq 'enabled[[:space:]]+2' > /dev/null 2>&1; then
        echo "Reboot required to load rules"
    fi
}
