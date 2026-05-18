#!/bin/sh

CRITICALITY=1
TITLE="Ensure pam_unix does not include nullok"

TARGET_FILES="/etc/pam.d/common-auth /etc/pam.d/common-password"

function check {
    STATUS="Pass"

    for TARGET_FILE in $TARGET_FILES; do
        if [ ! -f "$TARGET_FILE" ]; then
            continue
        fi

        if [ "match" = "match" ] && grep -Eq 'pam_unix\.so.*nullok' "$TARGET_FILE" > /dev/null 2>&1; then
            STATUS="Fail"
            break
        fi

        if [ "match" = "missing" ] && ! grep -Eq 'pam_unix\.so.*nullok' "$TARGET_FILE" > /dev/null 2>&1; then
            STATUS="Fail"
            break
        fi
    done

    if [ "$STATUS" = "Fail" ]; then
        STATUS="Fail: pam_unix includes nullok"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for TARGET_FILE in $TARGET_FILES; do
        if [ ! -f "$TARGET_FILE" ]; then
            continue
        fi

        cp -a "$TARGET_FILE" "$TARGET_FILE.$(date +"%s")"
        sed -Ei '/pam_unix\.so/ s/nullok//g' "$TARGET_FILE"
        sed -i '/pam_unix\.so/ s/[[:space:]]\+/ /g' "$TARGET_FILE"
        sed -i '/pam_unix\.so/ s/ $//' "$TARGET_FILE"

        if [ -n "" ] && ! grep -Eq '' "$TARGET_FILE" > /dev/null 2>&1; then
            sed -i '/pam_unix\.so/ s/$/ /' "$TARGET_FILE"
        fi
    done
}
