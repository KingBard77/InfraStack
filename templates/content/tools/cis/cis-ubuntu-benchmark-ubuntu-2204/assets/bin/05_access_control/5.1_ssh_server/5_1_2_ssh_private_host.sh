#!/bin/sh

CRITICALITY=1
TITLE="Ensure permissions on SSH private host key files are configured"

function check {
    STATUS="Fail"
    
    files=$(find /etc/ssh -type f -name 'ssh_host_*_key')
    
    for file in $files; do
        if [ $(stat -c "%a" $file) -eq 600 ] && [ $(stat -c "%U" $file) = "root" ]; then
            STATUS="Pass"
        else
            STATUS="Fail"
            break
        fi
    done
    
    echo "Check status: $STATUS"
}

function fix {
    files=$(find /etc/ssh -type f -name 'ssh_host_*_key')
    
    for file in $files; do
        chmod 600 $file
        chown root:root $file
    done
}