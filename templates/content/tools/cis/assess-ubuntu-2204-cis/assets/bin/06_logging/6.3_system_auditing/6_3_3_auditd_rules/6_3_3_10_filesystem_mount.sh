#!/bin/sh

CRITICALITY=1
TITLE="Ensure successful file system mounts are collected"

RULE_FILE="/etc/audit/rules.d/50-6.3.3.10-mounts.rules"

function check {
    STATUS="Pass"

    while IFS= read -r RULE; do
        if [ -z "$RULE" ]; then
            continue
        fi

        if ! grep -F -- "$RULE" /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
            STATUS="Fail: Mount audit rules are missing"
            echo "Check status: $STATUS"
            return
        fi

        if ! auditctl -l | grep -F -- "$RULE" > /dev/null 2>&1; then
            STATUS="Fail: Mount audit rules are missing"
            echo "Check status: $STATUS"
            return
        fi
    done <<'EOF'
-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=unset -k mounts
-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=unset -k mounts
EOF

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$RULE_FILE" ]; then
        cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    fi

    cat <<'EOF' > "$RULE_FILE"
-a always,exit -F arch=b64 -S mount -F auid>=1000 -F auid!=unset -k mounts
-a always,exit -F arch=b32 -S mount -F auid>=1000 -F auid!=unset -k mounts
EOF

    augenrules --load

    if auditctl -s | grep -Eq 'enabled[[:space:]]+2' > /dev/null 2>&1; then
        echo "Reboot required to load rules"
    fi
}
