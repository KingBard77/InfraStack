#!/bin/bash

CRITICALITY=1
TITLE="Ensure sshd Ciphers are configured"

function check {
    STATUS="Pass"
    GOOD_CIPHERS="aes256-ctr aes192-ctr aes128-ctr"

    if grep -E "^Ciphers" /etc/ssh/sshd_config > /dev/null 2>&1; then
        CIPHERS=$(grep -e "^Ciphers" /etc/ssh/sshd_config | awk '{print $2}' | sed 's/\,/ /g')
        for i in $CIPHERS; do
            if ! echo $GOOD_CIPHERS | grep -w $i > /dev/null 2>&1; then
                STATUS="Fail"
                echo "Failed: Invalid cipher found - $i"
            fi
        done
    else
        STATUS="Fail"
        echo "Failed: Ciphers parameter is not set"
    fi
    
    echo "Check status: $STATUS"
}

function fix {
    cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.$(date +"%s")

    sed -i '/^\s*Ciphers\s*/d' /etc/ssh/sshd_config

    echo "Ciphers aes256-ctr,aes192-ctr,aes128-ctr" | tee -a /etc/ssh/sshd_config > /dev/null

    systemctl restart sshd
}
