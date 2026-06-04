#!/bin/bash

CRITICALITY=1
TITLE='Ensure the NGINX process ID (PID) file is secured'

function check {
    STATUS="Pass"

    if ! command -v nginx > /dev/null 2>&1; then
        STATUS="Fail: nginx is not installed"
        echo "Check status: $STATUS"
        return
    fi

    NGINX_CONFIG="$(nginx -T 2>/dev/null)"
    if [[ -z "$NGINX_CONFIG" ]]; then
        STATUS="Fail: unable to read nginx configuration with nginx -T"
        echo "Check status: $STATUS"
        return
    fi

    PID_FILE="$(printf '%s\n' "$NGINX_CONFIG" | awk 'tolower($1) == "pid" { gsub(";", "", $2); print $2; exit }')"
    PID_FILE="${PID_FILE:-/run/nginx.pid}"

    if [[ -e "$PID_FILE" ]]; then
        OWNER="$(stat -c '%U' "$PID_FILE" 2>/dev/null)"
        MODE="$(stat -c '%a' "$PID_FILE" 2>/dev/null)"
        if [[ "$OWNER" != "root" ]] || [[ -z "$MODE" ]] || (( 8#$MODE & 022 )); then
            STATUS="Fail: nginx PID file is not secured: $PID_FILE"
        fi
    else
        STATUS="Fail: nginx PID file does not exist: $PID_FILE"
    fi

    echo "Check status: $STATUS"
}

function fix {
    PID_FILE="/run/nginx.pid"

    if command -v nginx > /dev/null 2>&1; then
        CONFIG_PID="$(nginx -T 2>/dev/null | awk 'tolower($1) == "pid" { gsub(";", "", $2); print $2; exit }')"
        [[ -n "$CONFIG_PID" ]] && PID_FILE="$CONFIG_PID"
    fi

    if [[ -e "$PID_FILE" ]]; then
        chown root:root "$PID_FILE"
        chmod go-w "$PID_FILE"
    else
        echo "NGINX PID file does not exist yet: $PID_FILE"
    fi
}
