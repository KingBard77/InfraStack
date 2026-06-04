#!/bin/sh

CRITICALITY=1
TITLE="Ensure noexec option set on /home partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/home' | grep "noexec"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set noexec is set on /home partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    MOUNT_POINT="/home"
    FSTAB="/etc/fstab"

    if ! findmnt -n "$MOUNT_POINT" > /dev/null 2>&1; then
        echo "/home is not a separate mounted filesystem; manual partitioning is required."
        return 1
    fi

    if findmnt -n -o OPTIONS "$MOUNT_POINT" | tr ',' '\n' | grep -qx noexec; then
        echo "Options noexec on /home are already configured correctly."
        return 0
    fi

    SOURCE="$(findmnt -n -o SOURCE "$MOUNT_POINT")"
    FSTYPE="$(findmnt -n -o FSTYPE "$MOUNT_POINT")"
    OPTIONS="$(findmnt -n -o OPTIONS "$MOUNT_POINT")"

    cp -a "$FSTAB" "$FSTAB.$(date +%s).bak"

    if awk '$2 == "/home" { found = 1 } END { exit !found }' "$FSTAB"; then
        awk '
            BEGIN { OFS = "\t" }
            $2 == "/home" {
                split($4, opts, ",")
                has_noexec = 0
                for (idx in opts) {
                    if (opts[idx] == "noexec") {
                        has_noexec = 1
                    }
                }
                if (!has_noexec) {
                    if ($4 == "") {
                        $4 = "defaults,noexec"
                    } else {
                        $4 = $4 ",noexec"
                    }
                }
            }
            { print }
        ' "$FSTAB" > "${FSTAB}.cis"
        mv "${FSTAB}.cis" "$FSTAB"
    else
        printf '%s %s %s %s,noexec 0 0\n' "$SOURCE" "$MOUNT_POINT" "$FSTYPE" "$OPTIONS" >> "$FSTAB"
    fi

    mount -o remount,noexec "$MOUNT_POINT"
}
