#!/bin/bash

CRITICALITY=1
TITLE="Ensure local interactive user dot files access is configured"

function check {
    STATUS="Pass"
    VALID_SHELLS=$(awk -F/ '$NF != "nologin" {print}' /etc/shells | paste -s -d '|')
    VALID_SHELLS="^($VALID_SHELLS)$"
    USERS=$(awk -v pat="$VALID_SHELLS" -F: '$(NF) ~ pat { print $1 " " $6 }' /etc/passwd)

    for user_home in $USERS; do
        user=$(echo $user_home | cut -d' ' -f1)
        home=$(echo $user_home | cut -d' ' -f2)

        if [ -d "$home" ]; then
            group=$(id -gn "$user")
            find "$home" -xdev -type f -name '.*' -print0 | while IFS= read -r -d '' file; do
                file_name=$(basename "$file")
                owner=$(stat -Lc '%U' "$file")
                group_owner=$(stat -Lc '%G' "$file")
                mode=$(stat -Lc '%a' "$file")

                case "$file_name" in
                    .forward|.rhost)
                        echo " - User: \"$user\" has \"$file_name\" file"
                        STATUS="Fail"
                        ;;
                    .netrc)
                        if [ "$mode" -gt 600 ]; then
                            echo " - User: \"$user\" \"$file_name\" file is mode \"$mode\" and should be 600 or more restrictive"
                            STATUS="Fail"
                        fi
                        ;;
                    .bash_history)
                        if [ "$mode" -gt 600 ]; then
                            echo " - User: \"$user\" \"$file_name\" file is mode \"$mode\" and should be 600 or more restrictive"
                            STATUS="Fail"
                        fi
                        ;;
                    *)
                        if [ "$mode" -gt 644 ]; then
                            echo " - User: \"$user\" \"$file_name\" file is mode \"$mode\" and should be 644 or more restrictive"
                            STATUS="Fail"
                        fi
                        ;;
                esac

                if [ "$user" != "$owner" ]; then
                    echo " - User: \"$user\" \"$file_name\" file is owned by \"$owner\""
                    STATUS="Fail"
                fi

                if [ "$group" != "$group_owner" ]; then
                    echo " - User: \"$user\" \"$file_name\" file is group owned by \"$group_owner\""
                    STATUS="Fail"
                fi
            done
        else
            echo " - User: \"$user\" Home \"$home\" doesn't exist"
            STATUS="Fail"
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    USERS=$(awk -v pat="$VALID_SHELLS" -F: '$(NF) ~ pat { print $1 " " $6 }' /etc/passwd)

    for user_home in $USERS; do
        user=$(echo $user_home | cut -d' ' -f1)
        home=$(echo $user_home | cut -d' ' -f2)

        if [ -d "$home" ]; then
            group=$(id -gn "$user")
            find "$home" -xdev -type f -name '.*' -print0 | while IFS= read -r -d '' file; do
                file_name=$(basename "$file")
                mode=$(stat -Lc '%a' "$file")

                case "$file_name" in
                    .forward|.rhost)
                        echo "Removing \"$file_name\" file for user \"$user\""
                        rm "$file"
                        ;;
                    .netrc)
                        if [ "$mode" -gt 600 ]; then
                            echo "Changing mode of \"$file_name\" to 600 for user \"$user\""
                            chmod 600 "$file"
                        fi
                        ;;
                    .bash_history)
                        if [ "$mode" -gt 600 ]; then
                            echo "Changing mode of \"$file_name\" to 600 for user \"$user\""
                            chmod 600 "$file"
                        fi
                        ;;
                    *)
                        if [ "$mode" -gt 644 ]; then
                            echo "Changing mode of \"$file_name\" to 644 for user \"$user\""
                            chmod 644 "$file"
                        fi
                        ;;
                esac

                chown "$user":"$group" "$file"
            done
        else
            echo "Creating home directory for user \"$user\" at \"$home\""
            mkdir -p "$home"
            chown "$user":"$user" "$home"
            chmod 750 "$home"
        fi
    done
}
