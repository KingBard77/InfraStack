#!/bin/bash

CRITICALITY=1
TITLE="Ensure access to all logfiles has been configured"

LOGFILE_PERMISSIONS=640
LOGDIR_PERMISSIONS=750
OWNER=root
GROUP=adm

function check {
    STATUS="Pass"

    for file in /var/log/*; do
        if [ -f "$file" ]; then
            FILE_PERM=$(stat -c "%a" "$file")
            FILE_OWNER=$(stat -c "%U" "$file")
            FILE_GROUP=$(stat -c "%G" "$file")

            if [ "$FILE_PERM" -gt "$LOGFILE_PERMISSIONS" ] || [ "$FILE_OWNER" != "$OWNER" ] || [ "$FILE_GROUP" != "$GROUP" ]; then
                STATUS="Fail"
            fi
        elif [ -d "$file" ]; then
            DIR_PERM=$(stat -c "%a" "$file")
            DIR_OWNER=$(stat -c "%U" "$file")
            DIR_GROUP=$(stat -c "%G" "$file")

            if [ "$DIR_PERM" -gt "$LOGDIR_PERMISSIONS" ] || [ "$DIR_OWNER" != "$OWNER" ] || [ "$DIR_GROUP" != "$GROUP" ]; then
                STATUS="Fail"
            fi
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    for file in /var/log/*; do
        if [ -f "$file" ]; then
            chmod "$LOGFILE_PERMISSIONS" "$file"
            chown "$OWNER":"$GROUP" "$file"
            echo "Fixed file $file"
        elif [ -d "$file" ]; then
            chmod "$LOGDIR_PERMISSIONS" "$file"
            chown "$OWNER":"$GROUP" "$file"
            echo "Fixed directory $file"
        fi
    done
}