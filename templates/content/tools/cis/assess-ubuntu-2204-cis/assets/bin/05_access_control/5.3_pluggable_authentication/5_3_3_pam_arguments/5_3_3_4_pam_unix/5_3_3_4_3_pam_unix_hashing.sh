#!/bin/sh

CRITICALITY=1
TITLE="Ensure pam_unix uses a strong password hashing algorithm"

TARGET_FILES="/etc/pam.d/common-password"

function check {
    STATUS="Pass"

    for TARGET_FILE in $TARGET_FILES; do
        if [ ! -f "$TARGET_FILE" ]; then
            continue
        fi

        if [ "missing" = "match" ] && grep -Eq 'pam_unix\.so.*(yescrypt|sha512)' "$TARGET_FILE" > /dev/null 2>&1; then
            STATUS="Fail"
            break
        fi

        if [ "missing" = "missing" ] && ! grep -Eq 'pam_unix\.so.*(yescrypt|sha512)' "$TARGET_FILE" > /dev/null 2>&1; then
            STATUS="Fail"
            break
        fi
    done

    if [ "$STATUS" = "Fail" ]; then
        STATUS="Fail: pam_unix does not use yescrypt or sha512"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for TARGET_FILE in $TARGET_FILES; do
        if [ ! -f "$TARGET_FILE" ]; then
            continue
        fi

        cp -a "$TARGET_FILE" "$TARGET_FILE.$(date +"%s")"
        sed -Ei '/pam_unix\.so/ s/\<(md5|bigcrypt|sha256|sha512|yescrypt|blowfish|gost_yescrypt)\>//g' "$TARGET_FILE"
        sed -i '/pam_unix\.so/ s/[[:space:]]\+/ /g' "$TARGET_FILE"
        sed -i '/pam_unix\.so/ s/ $//' "$TARGET_FILE"

        if [ -n "yescrypt" ] && ! grep -Eq 'pam_unix\.so.*yescrypt' "$TARGET_FILE" > /dev/null 2>&1; then
            sed -i '/pam_unix\.so/ s/$/ yescrypt/' "$TARGET_FILE"
        fi
    done
}
