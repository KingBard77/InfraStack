#!/bin/bash

CRITICALITY=2
TITLE="Ensure kernel module loading unloading and modification is collected"
function check {
    STATUS="Pass"

    if ! grep -RE kernel_modules /etc/audit/rules.d/*.rules > /dev/null 2>&1; then
        STATUS="Fail: audit rule is missing on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    RULE_FILE="/etc/audit/rules.d/50-6-3-3-19.rules"
    touch "$RULE_FILE"
    cp -a "$RULE_FILE" "$RULE_FILE.$(date +"%s")"
    cat > "$RULE_FILE" <<'CIS_RULES'
-a always,exit -F arch=b64 -S init_module,finit_module,delete_module -F auid!=unset -k kernel_modules
-a always,exit -F arch=b32 -S init_module,finit_module,delete_module -F auid!=unset -k kernel_modules
-a always,exit -F path=/usr/bin/kmod -F perm=x -F auid!=unset -k kernel_modules
CIS_RULES
    augenrules --load
}
