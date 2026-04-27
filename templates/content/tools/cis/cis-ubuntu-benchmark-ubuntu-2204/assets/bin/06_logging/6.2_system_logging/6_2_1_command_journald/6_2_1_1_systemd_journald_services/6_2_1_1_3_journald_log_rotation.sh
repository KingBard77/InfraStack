#!/bin/sh

CRITICALITY=1
TITLE="Ensure journald log file rotation is configured"

function check {
    STATUS="Fail"

    if grep -E "^SystemMaxUse=" /etc/systemd/journald.conf > /dev/null 2>&1; then
        if grep -E "^SystemKeepFree=" /etc/systemd/journald.conf > /dev/null 2>&1; then
            if grep -E "^RuntimeMaxUse=" /etc/systemd/journald.conf > /dev/null 2>&1; then
                if grep -E "^RuntimeKeepFree=" /etc/systemd/journald.conf > /dev/null 2>&1; then
                    if grep -E "^MaxFileSec=" /etc/systemd/journald.conf > /dev/null 2>&1; then
                        STATUS="Pass"
                    fi
                fi
            fi
        fi
    fi

    if [ "$STATUS" != "Pass" ]; then
        echo "Failed: One or more parameters are not set or incorrectly set"
    fi

    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/systemd/journald.conf /etc/systemd/journald.conf.$(date +"%s")

    sed -i '/^\s*SystemMaxUse\s*/d' /etc/systemd/journald.conf 
    sed -i '/^\s*SystemKeepFree\s*/d' /etc/systemd/journald.conf 
    sed -i '/^\s*RuntimeMaxUse\s*/d' /etc/systemd/journald.conf 
    sed -i '/^\s*RuntimeKeepFree\s*/d' /etc/systemd/journald.conf 
    sed -i '/^\s*MaxFileSec\s*/d' /etc/systemd/journald.conf 

    echo "SystemMaxUse=" | tee -a /etc/systemd/journald.conf  > /dev/null
    echo "SystemKeepFree=" | tee -a /etc/systemd/journald.conf  > /dev/null
    echo "RuntimeMaxUse=" | tee -a /etc/systemd/journald.conf  > /dev/null
    echo "RuntimeKeepFree=" | tee -a /etc/systemd/journald.conf  > /dev/null
    echo "MaxFileSec=" | tee -a /etc/systemd/journald.conf  > /dev/null

    systemctl restart systemd-journald
}