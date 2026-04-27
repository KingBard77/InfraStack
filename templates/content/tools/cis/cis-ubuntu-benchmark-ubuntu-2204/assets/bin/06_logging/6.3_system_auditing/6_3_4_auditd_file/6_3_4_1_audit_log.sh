#!/bin/sh

CRITICALITY=1
TITLE="Ensure audit log files are mode 0640 or less permissive"

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
    elif find "$LOG_DIR" -type f -perm /0137 | grep . > /dev/null 2>&1; then
        STATUS="Fail: Audit log files are too permissive"
    fi

    echo "Check status: $STATUS"
}

function fix {
    LOG_DIR="$(audit_log_directory)"
    mkdir -p "$LOG_DIR"

    if ! find "$LOG_DIR" -type f | grep . > /dev/null 2>&1; then
        touch "$LOG_DIR/audit.log"
    fi

    find "$LOG_DIR" -type f -exec chmod u=rw,g=r,o= {} +
}
