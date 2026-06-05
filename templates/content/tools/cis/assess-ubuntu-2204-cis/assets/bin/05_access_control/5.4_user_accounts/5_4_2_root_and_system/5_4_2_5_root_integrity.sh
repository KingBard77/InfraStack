#!/bin/bash

CRITICALITY=1
TITLE="Ensure root path integrity"
function check {
    STATUS="Pass"

    if echo "$PATH" | grep -Eq '(^|:)(\.|)(:|$)'; then
        STATUS="Fail: root PATH contains empty or relative entries"
    else
        OLD_IFS="$IFS"
        IFS=":"
        for DIR in $PATH; do
            if [[ -d "$DIR" ]]; then
                OWNER="$(stat -c %U "$DIR" 2>/dev/null)"
                MODE="$(stat -c %a "$DIR" 2>/dev/null)"
                if [[ "$OWNER" != "root" || $((8#$MODE & 022)) -ne 0 ]]; then
                    STATUS="Fail: $DIR is not root owned or is group/world writable"
                    break
                fi
            else
                STATUS="Fail: $DIR in root PATH does not exist"
                break
            fi
        done
        IFS="$OLD_IFS"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated remediation requires review of the root PATH entries.'
}
