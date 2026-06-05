#!/bin/bash

CRITICALITY=2
TITLE="Ensure the audit log file directory mode is configured"
function audit_dir {
    awk -F= '/^\s*log_file\s*=/{ gsub(/[[:space:]]/, "", $2); print $2 }' /etc/audit/auditd.conf 2>/dev/null | xargs dirname 2>/dev/null
}

function check {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    STATUS="Pass"

    if find "$AUDIT_DIR" -maxdepth 0 -perm /027 -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: audit log directory is more permissive than 0750"
    fi

    echo "Check status: $STATUS"
}

function fix {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    chmod g-w,o-rwx "$AUDIT_DIR" 2>/dev/null
}
