#!/bin/sh

CRITICALITY=1
TITLE="Ensure strong password hashing algorithm is configured"

ENCRYPT_METHODS="SHA512 YESCRYPT"

function check {
    STATUS="Fail"
    for METHOD in $ENCRYPT_METHODS; do
        if grep -E "^ENCRYPT_METHOD\s+${METHOD}" /etc/login.defs > /dev/null 2>&1; then
            STATUS="Pass"
            break
        fi
    done

    if [ "$STATUS" != "Pass" ]; then
        echo "Failed: ENCRYPT_METHOD is not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/login.defs /etc/login.defs.$(date +"%s")

    sed -i '/^\s*ENCRYPT_METHOD\s*/d' /etc/login.defs

    for METHOD in $ENCRYPT_METHODS; do
        echo "ENCRYPT_METHOD $METHOD" | tee -a /etc/login.defs > /dev/null
    done
}
