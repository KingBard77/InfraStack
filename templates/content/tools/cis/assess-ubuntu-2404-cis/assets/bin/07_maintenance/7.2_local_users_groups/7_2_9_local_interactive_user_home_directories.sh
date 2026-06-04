#!/bin/bash

CRITICALITY=1
TITLE="Ensure local interactive user home directories are configured"

function check {
    STATUS="Pass"
    VALID_SHELLS=$(awk -F/ '$NF != "nologin" {print}' /etc/shells | paste -s -d '|')
    VALID_SHELLS="^($VALID_SHELLS)$"
    USERS=$(awk -v pat="$VALID_SHELLS" -F: '$(NF) ~ pat { print $1 " " $6 }' /etc/passwd)

    for user_home in $USERS; do
        user=$(echo $user_home | cut -d' ' -f1)
        home=$(echo $user_home | cut -d' ' -f2)
        
        if [ ! -d "$home" ]; then
            echo " - User: \"$user\" Home \"$home\" Doesn't exist"
            STATUS="Fail"
        else
            owner=$(stat -Lc '%U' "$home")
            mode=$(stat -Lc '%a' "$home")
            max_mode='750'

            if [ "$user" != "$owner" ]; then
                echo " - User: \"$user\" Home \"$home\" is owned by: \"$owner\""
                STATUS="Fail"
            fi
            
            if [ "$mode" -gt "$max_mode" ]; then
                echo " - User: \"$user\" Home \"$home\" is mode: \"$mode\" should be mode: \"$max_mode\" or more restrictive"
                STATUS="Fail"
            fi
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    USERS=$(awk -v pat="$VALID_SHELLS" -F: '$(NF) ~ pat { print $1 " " $6 }' /etc/passwd)

    for user_home in $USERS; do
        user=$(echo $user_home | cut -d' ' -f1)
        home=$(echo $user_home | cut -d' ' -f2)
        
        if [ ! -d "$home" ]; then
            mkdir -p "$home"
            chown "$user":"$user" "$home"
        else
            owner=$(stat -Lc '%U' "$home")
            mode=$(stat -Lc '%a' "$home")
            max_mode='750'

            if [ "$user" != "$owner" ]; then
                chown "$user":"$user" "$home"
            fi
            
            if [ "$mode" -gt "$max_mode" ]; then
                chmod 750 "$home"
            fi
        fi
    done
}
