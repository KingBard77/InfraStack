#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit tools are owned by root"

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
        if [ "$(stat -c '%U' "$TOOL")" != "root" ]; then
            STATUS="Fail: Audit tools are not owned by root"
            break
        fi
    done <<EOF
$(audit_tools)
EOF

    echo "Check status: $STATUS"
}

function fix {
    audit_tools | while IFS= read -r TOOL; do
        chown root "$TOOL"
    done
}
