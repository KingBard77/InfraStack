#!/bin/sh

CRITICALITY=1
TITLE="Ensure the audit log directory is mode 0750 or less permissive"

function audit_log_directory {
    LOG_FILE="$(awk -F= '/^[[:space:]]*log_file[[:space:]]*=/{gsub(/[[:space:]]/, "", $2); print $2; exit}' /etc/audit/auditd.conf)"

    if [ -z "$LOG_FILE" ]; then
        LOG_FILE="/var/log/audit/audit.log"
    fi

    dirname "$LOG_FILE"
}

function check {
    STATUS="Pass"
    LOG_DIR="$(audit_log_directory)"

    if [ ! -d "$LOG_DIR" ]; then
        STATUS="Fail: Audit log directory does not exist"
    elif find "$LOG_DIR" -maxdepth 0 -perm /0027 | grep . > /dev/null 2>&1; then
        STATUS="Fail: Audit log directory is too permissive"
    fi

    echo "Check status: $STATUS"
}

function fix {
    LOG_DIR="$(audit_log_directory)"
    mkdir -p "$LOG_DIR"
    chmod 0750 "$LOG_DIR"
}
