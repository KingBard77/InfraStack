#!/bin/bash

CRITICALITY=1
TITLE='Ensure password complexity is configured'

function check {
    STATUS="Pass"
    CONFIG="/etc/security/pwquality.conf"

    for SETTING in minclass dcredit ucredit ocredit lcredit; do
        if ! grep -Eq "^[[:space:]]*$SETTING[[:space:]]*=" "$CONFIG" 2>/dev/null; then
            STATUS="Fail: password complexity setting is missing: $SETTING"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    backup_file() {
        TARGET="$1"
        if [[ -f "$TARGET" ]]; then
            cp -a "$TARGET" "$TARGET.$(date +%s).bak"
        fi
    }

    set_key_value() {
        FILE="$1"
        KEY="$2"
        VALUE="$3"
        mkdir -p "$(dirname "$FILE")"
        touch "$FILE"
        backup_file "$FILE"
        sed -i -E "/^[[:space:]]*$KEY[[:space:]]*=/d" "$FILE"
        printf '%s = %s\n' "$KEY" "$VALUE" >> "$FILE"
    }

    if ! dpkg-query -W -f='${Status}' libpam-pwquality 2>/dev/null | grep -q 'install ok installed'; then
        apt-get update
        DEBIAN_FRONTEND=noninteractive apt-get install -y libpam-pwquality
    fi

    CONFIG="/etc/security/pwquality.conf"
    set_key_value "$CONFIG" minclass 4
    set_key_value "$CONFIG" dcredit -1
    set_key_value "$CONFIG" ucredit -1
    set_key_value "$CONFIG" ocredit -1
    set_key_value "$CONFIG" lcredit -1
}
