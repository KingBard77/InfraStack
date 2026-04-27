#!/bin/sh

CRITICALITY=1
TITLE="Ensure kernel module loading and unloading is collected"

RULE_FILE="/etc/audit/rules.d/50-6.3.3.19-kernel-modules.rules"

function build_rules {
    cat <<'EOF'
-a always,exit -F arch=b64 -S init_module,finit_module,delete_module -F auid>=1000 -F auid!=unset -k kernel_modules
-a always,exit -F arch=b32 -S init_module,delete_module -F auid>=1000 -F auid!=unset -k kernel_modules
EOF

    for CANDIDATE in \
    "/usr/bin/kmod"
    "/usr/sbin/modprobe"
    "/usr/sbin/insmod"
    "/usr/sbin/rmmod"
    "/usr/sbin/depmod"
    "/sbin/modprobe"
    "/sbin/insmod"
    "/sbin/rmmod"
    "/sbin/depmod"; do
        if [ -e "$CANDIDATE" ]; then
            echo "-a always,exit -F path=$CANDIDATE -F perm=x -F auid>=1000 -F auid!=unset -k kernel_modules"
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
            STATUS="Fail: Kernel module audit rules are missing"
            break
        fi

        if ! auditctl -l | grep -F -- "$RULE" > /dev/null 2>&1; then
            STATUS="Fail: Kernel module audit rules are missing"
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
