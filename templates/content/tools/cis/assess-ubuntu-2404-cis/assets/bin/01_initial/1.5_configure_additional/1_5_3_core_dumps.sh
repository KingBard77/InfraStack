#!/bin/bash

CRITICALITY=1
TITLE="Ensure core dumps are restricted"

function check {
    STATUS="Fail"

    if grep 'root.*hard.*core' /etc/security/limits.conf > /dev/null 2>&1; then
        if grep -q 'fs.suid_dumpable = 0' /etc/sysctl.conf > /dev/null 2>&1; then
            if grep -q '^\[Coredump\]' /etc/systemd/coredump.conf && grep -q 'Storage=none' /etc/systemd/coredump.conf && grep -q 'ProcessSizeMax=0' /etc/systemd/coredump.conf > /dev/null 2>&1; then
                STATUS="Pass"
            else    
                STATUS="Entries not found in /etc/systemd/coredump.conf"
            fi
        else
            STATUS="No entry found for fs.suid_dumpable = 0 in /etc/sysctl.conf"
        fi
    else
        STATUS="No entry found for root hard core in /etc/security/limits.conf"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/security/limits.conf /etc/security/limits.conf.$(date +"%s")
    sed -i '/^#*root\s*hard\s*core.*/d' /etc/security/limits.conf
    echo -e 'root\thard\tcore\t0' | tee -a /etc/security/limits.conf

    cp -a /etc/sysctl.conf /etc/sysctl.conf.$(date +"%s")
    sed -i '/^#*fs.suid_dumpable.*/d' /etc/sysctl.conf
    echo 'fs.suid_dumpable = 0' | tee -a /etc/sysctl.conf

    cp -a /etc/systemd/coredump.conf /etc/systemd/coredump.conf.$(date +"%s")
    echo -e "[Coredump]\nStorage=none\nProcessSizeMax=0" | tee /etc/systemd/coredump.conf

    systemctl daemon-reload
}
