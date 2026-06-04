#!/bin/bash

CRITICALITY=2
TITLE="Ensure users must provide password for privilege escalation"

function check {
    STATUS="Fail"

    if grep -r "^[^#].*NOPASSWD" /etc/sudoers* > /dev/null 2>&1; then
        STATUS="Fail"
    else
        echo "Failed: NOPASSWD is been configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    for file in /etc/sudoers /etc/sudoers.d/*; do
        if grep -q "^[^#].*NOPASSWD" "$file"; then
            cp -a "$file" "$file.$(date +"%s")"
            sed -i '/^[^#].*NOPASSWD/d' "$file"
        fi
    done
}
