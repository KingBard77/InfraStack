#!/bin/bash

CRITICALITY=1
TITLE="Ensure re-authentication for privilege escalation is not disabled globally"

function check {
    STATUS="Fail"

    if grep -r "^[^#].*\!authenticate" /etc/sudoers* > /dev/null 2>&1; then
        STATUS="Fail"
    else
        echo "Failed: authenticate is been configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for file in /etc/sudoers /etc/sudoers.d/*; do
        if grep -q "^[^#].*\!authenticate" "$file"; then
            cp -a "$file" "$file.$(date +"%s")"
            sed -i '/^[^#].*\!authenticate/d' "$file"
        fi
    done
}
