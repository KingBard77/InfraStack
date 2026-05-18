#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality enables dictionary checks"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*dictcheck[[:space:]]*=[[:space:]]*1([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: dictcheck is not set to 1"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*dictcheck[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*dictcheck[[:space:]]*=.*/dictcheck = 1/' "$SETTING_FILE"
    else
        echo "dictcheck = 1" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
