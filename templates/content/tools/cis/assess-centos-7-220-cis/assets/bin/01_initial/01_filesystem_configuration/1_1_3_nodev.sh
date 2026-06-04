#!/bin/sh


CRITICALITY=1
TITLE="Ensure nodev option set on /tmp partition"

function check {
	STATUS="Fail"

	mount | grep /tmp 2>&1 | grep -E "nodev"  > /dev/null 

	if [ $? == 0 ]; then
		STATUS="Pass"
	fi
}

function fix {
	cp -a /etc/systemd/system/local-fs.target.wants/tmp.mount /etc/systemd/system/local-fs.target.wants/tmp.mount.$(date +"%s")
	sed -i s/^Options/'Options=mode=1777,strictatime,noexec,nodev,nosuid'/g /etc/systemd/system/local-fs.target.wants/tmp.mount
}