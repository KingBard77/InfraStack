#!/bin/bash

CRITICALITY=2
TITLE="Ensure audit log files mode is configured"
function audit_dir {
    awk -F= '/^\s*log_file\s*=/{ gsub(/[[:space:]]/, "", $2); print $2 }' /etc/audit/auditd.conf 2>/dev/null | xargs dirname 2>/dev/null
}

function check {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    STATUS="Pass"

    if find "$AUDIT_DIR" -type f -perm /037 -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: audit log files are more permissive than 0640"
    fi

    echo "Check status: $STATUS"
}

function fix {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    find "$AUDIT_DIR" -type f -exec chmod u-x,g-wx,o-rwx {} \; 2>/dev/null
}
