#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality enforces failed password quality checks"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*enforcing[[:space:]]*=[[:space:]]*1([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: enforcing is not set to 1"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*enforcing[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*enforcing[[:space:]]*=.*/enforcing = 1/' "$SETTING_FILE"
    else
        echo "enforcing = 1" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
