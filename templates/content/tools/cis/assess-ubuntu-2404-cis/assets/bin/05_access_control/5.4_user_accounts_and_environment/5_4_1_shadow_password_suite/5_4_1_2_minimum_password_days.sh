#!/bin/bash

CRITICALITY=2
TITLE='Ensure minimum password days is configured'

function check {
    STATUS="Pass"

    if ! awk '/^[[:space:]]*PASS_MIN_DAYS[[:space:]]+/ { if ($2 >= 1) found=1 } END { exit !found }' /etc/login.defs 2>/dev/null; then
        STATUS="Fail: PASS_MIN_DAYS is not set to 1 or more"
    fi

    echo "Check status: $STATUS"
}

function fix {
    backup_file() {
        TARGET="$1"
        if [[ -f "$TARGET" ]]; then
            cp -a "$TARGET" "$TARGET.$(date +%s).bak"
        fi
    }

    FILE="/etc/login.defs"
    backup_file "$FILE"
    sed -i -E '/^[[:space:]]*PASS_MIN_DAYS[[:space:]]+/d' "$FILE"
    printf 'PASS_MIN_DAYS 1\n' >> "$FILE"
}
