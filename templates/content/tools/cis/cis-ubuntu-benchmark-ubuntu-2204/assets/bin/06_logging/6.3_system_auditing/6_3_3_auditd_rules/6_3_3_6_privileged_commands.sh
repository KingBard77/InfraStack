#!/bin/sh

CRITICALITY=1
TITLE="Ensure use of privileged commands is collected"

RULE_FILE="/etc/audit/rules.d/50-6.3.3.6-privileged.rules"

function build_rules {
    df --local -P | awk 'NR>1 {print $6}' | sort -u | while IFS= read -r MOUNT_POINT; do
        find "$MOUNT_POINT" -xdev -type f \( -perm -4000 -o -perm -2000 \) 2>/dev/null
    done | sort -u | while IFS= read -r FILE_PATH; do
        echo "-a always,exit -F path=$FILE_PATH -F perm=x -F auid>=1000 -F auid!=unset -k privileged"
    done
}

function check {
    STATUS="Pass"
    RULES_FILE="$(mktemp)"
    build_rules > "$RULES_FILE"

    if [ ! -s "$RULES_FILE" ]; then
        rm -f "$RULES_FILE"
        echo "Check status: $STATUS"
        return
    fi

    while IFS= read -r RULE; do
        if ! grep -F -- "$RULE" /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
            STATUS="Fail: Privileged command audit rules are missing on disk"
            break
        fi

        if ! auditctl -l | grep -F -- "$RULE" > /dev/null 2>&1; then
            STATUS="Fail: Privileged command audit rules are not loaded"
            break
        fi
    done < "$RULES_FILE"

    rm -f "$RULES_FILE"
    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$RULE_FILE" ]; then
        cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    fi

    build_rules > "$RULE_FILE"
    augenrules --load

    if auditctl -s | grep -Eq 'enabled[[:space:]]+2' > /dev/null 2>&1; then
        echo "Reboot required to load rules"
    fi
}
