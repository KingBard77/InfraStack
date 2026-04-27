#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality enforces a minimum password length"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*minlen[[:space:]]*=[[:space:]]*14([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: minlen is not set to 14"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*minlen[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*minlen[[:space:]]*=.*/minlen = 14/' "$SETTING_FILE"
    else
        echo "minlen = 14" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
