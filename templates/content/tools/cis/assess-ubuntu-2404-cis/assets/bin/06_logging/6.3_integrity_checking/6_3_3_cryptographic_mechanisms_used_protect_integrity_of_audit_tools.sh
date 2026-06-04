#!/bin/bash

CRITICALITY=2
TITLE="Ensure cryptographic mechanisms are used to protect the integrity of audit tools"
function check {
    STATUS="Pass"

    for TOOL in /sbin/auditctl /sbin/auditd /sbin/ausearch /sbin/aureport /sbin/autrace /sbin/augenrules; do
        if [[ -x "$TOOL" ]] && ! grep -Eq "^$TOOL\s+.*sha512" /etc/aide/aide.conf /etc/aide/aide.conf.d/* 2>/dev/null; then
            STATUS="Fail: $TOOL is not covered by AIDE sha512 rules"
            break
        fi
    done

    echo "Check status: $STATUS"
}

function fix {
    touch /etc/aide/aide.conf
    cp -a /etc/aide/aide.conf /etc/aide/aide.conf.$(date +"%s")
    for TOOL in /sbin/auditctl /sbin/auditd /sbin/ausearch /sbin/aureport /sbin/autrace /sbin/augenrules; do
        if [[ -x "$TOOL" ]] && ! grep -Eq "^$TOOL\s+" /etc/aide/aide.conf; then
            echo "$TOOL p+i+n+u+g+s+b+acl+xattrs+sha512" | tee -a /etc/aide/aide.conf > /dev/null
        fi
    done
}
