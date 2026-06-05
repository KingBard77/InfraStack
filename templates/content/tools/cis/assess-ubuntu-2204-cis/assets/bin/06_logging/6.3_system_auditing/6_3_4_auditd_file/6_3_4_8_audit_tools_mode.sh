#!/bin/bash

CRITICALITY=2
TITLE="Ensure audit tools mode is configured"
function audit_dir {
    awk -F= '/^\s*log_file\s*=/{ gsub(/[[:space:]]/, "", $2); print $2 }' /etc/audit/auditd.conf 2>/dev/null | xargs dirname 2>/dev/null
}

function check {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    STATUS="Pass"

    if find /sbin /usr/sbin -maxdepth 1 \( -name auditctl -o -name auditd -o -name ausearch -o -name aureport -o -name autrace -o -name augenrules \) -perm /022 -print -quit 2>/dev/null | grep -q .; then
        STATUS="Fail: audit tools are group or world writable"
    fi

    echo "Check status: $STATUS"
}

function fix {
    AUDIT_DIR="$(audit_dir)"
    AUDIT_DIR="${AUDIT_DIR:-/var/log/audit}"
    find /sbin /usr/sbin -maxdepth 1 \( -name auditctl -o -name auditd -o -name ausearch -o -name aureport -o -name autrace -o -name augenrules \) -exec chmod go-w {} \; 2>/dev/null
}
