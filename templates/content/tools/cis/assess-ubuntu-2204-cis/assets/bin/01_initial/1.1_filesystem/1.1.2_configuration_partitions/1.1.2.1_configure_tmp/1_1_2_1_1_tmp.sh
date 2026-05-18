#!/bin/sh

CRITICALITY=1
TITLE="Ensure /tmp is a separate partition or mounted with tmpfs"

function check {
    STATUS="Fail"

    if mount | grep -E "/tmp type tmpfs \(rw,nosuid,nodev,noexec,inode64\)" > /dev/null; then
        STATUS="Pass"
    else
        STATUS="Not mounted with tmpfs or missing/extra options"
    fi

    echo "Check status: $STATUS"
}

function fix {
    CURRENT_OPTIONS=$(systemctl show -p Options --value tmp.mount)

    if [ "$CURRENT_OPTIONS" == "$DESIRED_OPTIONS" ]; then
        echo "/tmp is already configured correctly."
    else
        systemctl unmask tmp.mount
        systemctl enable tmp.mount

        cp -a /etc/systemd/system/local-fs.target.wants/tmp.mount /etc/systemd/system/local-fs.target.wants/tmp.mount.$(date +"%s")
        sed -i "s/^Options=.*/Options=mode=1777,strictatime,noexec,nodev,nosuid,inode64/" /etc/systemd/system/local-fs.target.wants/tmp.mount

        # Reload systemd daemon and restart the tmp.mount to apply changes
        systemctl daemon-reload
        systemctl restart tmp.mount
    fi
}
