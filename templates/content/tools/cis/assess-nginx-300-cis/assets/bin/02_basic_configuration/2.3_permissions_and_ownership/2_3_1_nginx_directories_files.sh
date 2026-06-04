#!/bin/bash

CRITICALITY=1
TITLE='Ensure NGINX directories and files are owned by root'

function check {
    STATUS="Pass"
    PATHS=(/etc/nginx /usr/share/nginx /var/log/nginx)

    for TARGET in "${PATHS[@]}"; do
        [[ ! -e "$TARGET" ]] && continue
        if find "$TARGET" ! -user root -print -quit 2>/dev/null | grep -q .; then
            STATUS="Fail: nginx path contains files not owned by root: $TARGET"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    for TARGET in /etc/nginx /usr/share/nginx /var/log/nginx; do
        if [[ -e "$TARGET" ]]; then
            chown -R root:root "$TARGET"
        fi
    done
}
