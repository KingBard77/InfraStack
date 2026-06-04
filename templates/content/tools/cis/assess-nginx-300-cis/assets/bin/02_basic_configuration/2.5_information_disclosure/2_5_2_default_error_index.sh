#!/bin/bash

CRITICALITY=1
TITLE='Ensure default error and index.html pages do not reference NGINX'

function check {
    STATUS="Pass"
    DEFAULT_FILES=(/usr/share/nginx/html/index.html /usr/share/nginx/html/50x.html /var/www/html/index.nginx-debian.html)

    for TARGET in "${DEFAULT_FILES[@]}"; do
        [[ ! -f "$TARGET" ]] && continue
        if grep -Eiq 'nginx' "$TARGET"; then
            STATUS="Fail: default page references nginx: $TARGET"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    for TARGET in /usr/share/nginx/html/index.html /usr/share/nginx/html/50x.html /var/www/html/index.nginx-debian.html; do
        if [[ -f "$TARGET" ]]; then
            cp -a "$TARGET" "$TARGET.$(date +%s).bak"
            sed -i -E 's/NGINX|Nginx|nginx/web server/g' "$TARGET"
        fi
    done
}
