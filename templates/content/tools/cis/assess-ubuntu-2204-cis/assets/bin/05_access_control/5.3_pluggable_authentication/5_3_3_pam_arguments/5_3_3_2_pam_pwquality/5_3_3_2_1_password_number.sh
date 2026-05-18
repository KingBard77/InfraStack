#!/bin/sh

CRITICALITY=1
TITLE="Ensure pwquality sets the minimum number of changed characters"

SETTING_FILE="/etc/security/pwquality.conf"

function check {
    STATUS="Fail"

    if [ -f "$SETTING_FILE" ] && grep -Eq '^[[:space:]]*difok[[:space:]]*=[[:space:]]*2([[:space:]]*(#.*)?)?$' "$SETTING_FILE" > /dev/null 2>&1; then
        STATUS="Pass"
    else
        STATUS="Fail: difok is not set to 2"
    fi

    echo "Check status: $STATUS"
}

function fix {
    if [ -f "$SETTING_FILE" ]; then
        cp -a "$SETTING_FILE" "$SETTING_FILE.$(date +"%s")"
    else
        touch "$SETTING_FILE"
    fi

    if grep -Eq '^[[:space:]]*difok[[:space:]]*=' "$SETTING_FILE" > /dev/null 2>&1; then
        sed -i 's/^[[:space:]]*difok[[:space:]]*=.*/difok = 2/' "$SETTING_FILE"
    else
        echo "difok = 2" | tee -a "$SETTING_FILE" > /dev/null
    fi
}
