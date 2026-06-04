#!/bin/bash

CRITICALITY=1
TITLE='Ensure access to NGINX directories and files is restricted'

function check {
    STATUS="Pass"
    PATHS=(/etc/nginx /usr/share/nginx /var/log/nginx)

    for TARGET in "${PATHS[@]}"; do
        [[ ! -e "$TARGET" ]] && continue
        if find "$TARGET" -perm /022 -print -quit 2>/dev/null | grep -q .; then
            STATUS="Fail: nginx path contains group/world writable files: $TARGET"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    for TARGET in /etc/nginx /usr/share/nginx /var/log/nginx; do
        if [[ -e "$TARGET" ]]; then
            find "$TARGET" -type d -exec chmod go-w {} +
            find "$TARGET" -type f -exec chmod go-w {} +
        fi
    done
}
