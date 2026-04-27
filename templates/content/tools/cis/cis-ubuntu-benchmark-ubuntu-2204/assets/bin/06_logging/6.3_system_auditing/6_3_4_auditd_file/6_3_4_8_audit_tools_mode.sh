#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit tools are mode 0755 or less permissive"

function audit_tools {
    for TOOL in /sbin/auditctl /sbin/aureport /sbin/ausearch /sbin/autrace /sbin/augenrules /usr/sbin/auditctl /usr/sbin/aureport /usr/sbin/ausearch /usr/sbin/autrace /usr/sbin/augenrules; do
        if [ -e "$TOOL" ]; then
            echo "$TOOL"
        fi
    done | sort -u
}

function check {
    STATUS="Pass"

    while IFS= read -r TOOL; do
        if find "$TOOL" -maxdepth 0 -perm /0022 | grep . > /dev/null 2>&1; then
            STATUS="Fail: Audit tools are too permissive"
            break
        fi
    done <<EOF
$(audit_tools)
EOF

    echo "Check status: $STATUS"
}

function fix {
    audit_tools | while IFS= read -r TOOL; do
        chmod 0755 "$TOOL"
    done
}
