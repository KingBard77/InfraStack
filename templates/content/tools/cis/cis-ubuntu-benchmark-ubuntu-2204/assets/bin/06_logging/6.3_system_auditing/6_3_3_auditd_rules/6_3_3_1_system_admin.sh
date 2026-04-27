#!/bin/sh

CRITICALITY=1
TITLE="Ensure changes to system administration scope (sudoers) is collected"

AUDIT_RULE_FILE="/etc/audit/rules.d/audit.rules"
AUDIT_RULES="-w /etc/sudoers -p wa -k scope -w /etc/sudoers.d -p wa -k scope"

function check {
    STATUS="Fail"

    if awk '/^ *-w/ && /\/etc\/sudoers/ && / +-p *wa/ && (/ key= *[!-~]* *$/ || / -k *[!-~]* *$)/' $AUDIT_RULE_FILE > /dev/null 2>&1; then
        if auditctl -l | awk '/^ *-w/ && /\/etc\/sudoers/ && / +-p *wa/ && (/ key= *[!-~]* *$/ || / -k *[!-~]* *$)/' > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Failed: Audit rules are not loaded correctly"
        fi
    else
        STATUS="Failed: Audit rules are not set correctly on disk"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a $AUDIT_RULE_FILE $AUDIT_RULE_FILE.$(date +"%s")

    echo "$AUDIT_RULES" | tee -a $AUDIT_RULE_FILE > /dev/null

    augenrules --load

    if auditctl -s | grep "enabled" | grep -q "2"; then
        echo "Reboot required to load rules"
    fi
}
