#!/bin/sh

CRITICALITY=1
TITLE="Ensure all groups in /etc/passwd exist in /etc/group"

function check {
	STATUS="Pass"
	for i in $(cut -s -d: -f4 /etc/passwd | sort -u ); do 
		grep -q -P "^.*?:[^:]*:$i:" /etc/group
		if [ $? -ne 0 ]; then
			STATUS="Fail"
			return
			echo "Group $i is referenced by /etc/passwd but does not exist in /etc/group"
		fi
	done
}

function fix {
    awk -F: '{print $4}' /etc/passwd | sort -u | while read -r gid; do
        if ! awk -F: -v gid="$gid" '$3 == gid' /etc/group > /dev/null; then
            group_name="group_$gid"
            groupadd -g "$gid" "$group_name"
        fi
    done
}