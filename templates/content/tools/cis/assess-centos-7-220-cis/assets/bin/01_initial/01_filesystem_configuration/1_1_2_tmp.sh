#!/bin/sh

CRITICALITY=1
TITLE="Ensure separate partition exists for /tmp"

function check {
  STATUS="Fail"

  mount | grep \ /tmp 2>&1 | grep -E "tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noexec,relatime)"  > /dev/null 

  if [ $? == 0 ]; then
    STATUS="Pass"
fi
}

function fix {
  systemctl unmask tmp.mount
  systemctl enable tmp.mount
  cp -a /etc/systemd/system/local-fs.target.wants/tmp.mount /etc/systemd/system/local-fs.target.wants/tmp.mount.$(date +"%s")
  sed -i "s/^Options=.*/Options=mode=1777,strictatime,noexec,nodev,nosuid" /etc/systemd/system/local-fs.target.wants/tmp.mount 
}