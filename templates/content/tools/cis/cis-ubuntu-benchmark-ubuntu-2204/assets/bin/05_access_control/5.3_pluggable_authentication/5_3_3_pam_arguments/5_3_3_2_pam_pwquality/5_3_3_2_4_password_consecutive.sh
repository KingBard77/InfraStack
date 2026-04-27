#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality limits repeated characters"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*maxrepeat[[:space:]]*=[[:space:]]*3([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: maxrepeat is not set to 3"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*maxrepeat[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*maxrepeat[[:space:]]*=.*/maxrepeat = 3/' "$SETTING_FILE"
    else
        echo "maxrepeat = 3" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
