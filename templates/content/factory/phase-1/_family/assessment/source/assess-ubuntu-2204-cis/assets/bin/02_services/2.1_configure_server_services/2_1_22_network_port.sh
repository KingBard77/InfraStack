#!/bin/bash

CRITICALITY=1
TITLE="Ensure only approved services are listening on a network interface"

APPROVED_SERVICES=("sshd:22/tcp" "httpd:80/tcp" "nginx:443/tcp") # Adjust as necessary

function check {
    STATUS="Pass"
    UNAPPROVED_SERVICES=()

    while IFS= read -r line; do
        proto=$(echo "$line" | awk '{print $1}')
        port=$(echo "$line" | awk '{print $5}' | awk -F: '{print $2}')
        service=$(echo "$line" | awk '{print $7}' | awk -F, '{print $1}' | sed 's/\"//g')

        if [ -z "$port" ]; then
            port="unknown"
        fi

        service_port_proto="${service}:${port}/${proto}"
        
        if [[ ! " ${APPROVED_SERVICES[@]} " =~ " ${service_port_proto} " ]]; then
            UNAPPROVED_SERVICES+=("$service_port_proto")
        fi
    done < <(ss -plntu | tail -n +2)

    if [ ${#UNAPPROVED_SERVICES[@]} -eq 0 ]; then
        echo "Pass"
    else
        STATUS="Fail: Unapproved services found"
        # echo "Unapproved services found:"
        # for us in "${UNAPPROVED_SERVICES[@]}"; do
        #     echo " - $us"
        # done
        echo "Check status: $STATUS"
    fi
}

function fix {
    echo 'Manual: Approved listening services need an approved service baseline.'
}
