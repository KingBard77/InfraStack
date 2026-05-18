#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality checks the GECOS fields"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*gecoscheck[[:space:]]*=[[:space:]]*1([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: gecoscheck is not set to 1"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*gecoscheck[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*gecoscheck[[:space:]]*=.*/gecoscheck = 1/' "$SETTING_FILE"
    else
        echo "gecoscheck = 1" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
