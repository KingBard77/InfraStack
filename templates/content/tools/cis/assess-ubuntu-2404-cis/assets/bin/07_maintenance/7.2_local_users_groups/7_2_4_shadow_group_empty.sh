#!/bin/bash

CRITICALITY=1
TITLE="Ensure shadow group is empty"

function check {
    STATUS="Pass"

    if awk -F: '($1=="shadow") {print $NF}' /etc/group | grep -q '[^[:space:]]'; then
        echo "Users are assigned to the shadow group."
        STATUS="Fail"
    fi

    SHADOW_GID=$(getent group shadow | awk -F: '{print $3}')
    if getent group shadow | awk -F: '{print $3}'; then
        if awk -F: -v gid="$SHADOW_GID" '($4 == gid) {print " - User: \"" $1 "\" primary group is the shadow group"}' /etc/passwd | grep -q '[^[:space:]]'; then
            STATUS="Fail"
        fi
    fi

    echo "Check status: $STATUS"
}

function fix {
    sed -ri 's/(^shadow:[^:]*:[^:]*:)([^:]+$)/\1/' /etc/group

    SHADOW_GID=$(getent group shadow | awk -F: '{print $3}')
    if [ -n "$SHADOW_GID" ]; then
        awk -F: -v gid="$SHADOW_GID" '($4 == gid) {system("usermod -g users " $1)}' /etc/passwd
    fi
}
