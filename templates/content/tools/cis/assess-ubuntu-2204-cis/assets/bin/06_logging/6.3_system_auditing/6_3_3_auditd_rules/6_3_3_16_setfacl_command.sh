#!/bin/sh

CRITICALITY=1
TITLE="Ensure the setfacl command is audited"

RULE_FILE="/etc/audit/rules.d/50-6.3.3.16-setfacl.rules"

function build_rules {
    :

    for CANDIDATE in \
    "/usr/bin/setfacl"
    "/bin/setfacl"; do
        if [ -e "$CANDIDATE" ]; then
            echo "-a always,exit -F path=$CANDIDATE -F perm=x -F auid>=1000 -F auid!=unset -k perm_mod"
        fi
    done | sort -u
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
            STATUS="Fail: The setfacl audit rule is missing"
            break
        fi

        if ! auditctl -l | grep -F -- "$RULE" > /dev/null 2>&1; then
            STATUS="Fail: The setfacl audit rule is missing"
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
