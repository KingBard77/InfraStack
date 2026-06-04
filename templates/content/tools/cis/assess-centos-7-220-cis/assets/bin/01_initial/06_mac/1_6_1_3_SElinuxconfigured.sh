#!/bin/sh

CRITICALITY=1
TITLE="Ensure SELinux policy is configured"

function check {
STATUS="Fail"

  grep SELINUXTYPE=targeted /etc/selinux/config 2>&1 | grep -E "SELINUXTYPE=targeted"  > /dev/null 

  if [ $? == 0 ]; then
    sestatus 2>&1 | grep -E "Loaded policy name.*targeted"  > /dev/null
    if [ $? == 0 ]; then
      STATUS="Pass"
    fi
  fi
}

function fix {
  cp -a /etc/selinux/config /etc/selinux/config.$(date +"%s")
  sed -i "s/^SELINUXTYPE=.*/SELINUXTYPE=targeted/" /etc/selinux/config
}