#!/bin/bash

CRITICALITY=1
TITLE="Ensure nodev option set on /tmp partition"

function check {
	STATUS="Fail"
	
    if mount | grep '/tmp' | grep "nodev"  > /dev/null ; then
        STATUS="Pass"
    else
        STATUS="No options set nodev is set on /tmp partition"
    fi

    echo "Check status: $STATUS"
}

function fix {
    CURRENT_OPTIONS=$(systemctl show -p Options --value tmp.mount)

    if [ "$CURRENT_OPTIONS" == "$DESIRED_OPTIONS" ]; then
        echo "Options nodev on /tmp is already configured correctly."
    else

        cp -a /etc/systemd/system/local-fs.target.wants/tmp.mount /etc/systemd/system/local-fs.target.wants/tmp.mount.$(date +"%s")
        sed -i "s/^Options=.*/Options=mode=1777,strictatime,noexec,nodev,nosuid,inode64/" /etc/systemd/system/local-fs.target.wants/tmp.mount

        # Reload systemd daemon and restart the tmp.mount to apply changes
        systemctl daemon-reload
        systemctl restart tmp.mount
    fi
}
