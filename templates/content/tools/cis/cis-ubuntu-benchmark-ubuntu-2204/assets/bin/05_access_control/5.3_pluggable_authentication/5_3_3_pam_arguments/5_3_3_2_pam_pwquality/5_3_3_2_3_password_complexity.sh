#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality requires character class complexity"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*minclass[[:space:]]*=[[:space:]]*4([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: minclass is not set to 4"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*minclass[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*minclass[[:space:]]*=.*/minclass = 4/' "$SETTING_FILE"
    else
        echo "minclass = 4" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
