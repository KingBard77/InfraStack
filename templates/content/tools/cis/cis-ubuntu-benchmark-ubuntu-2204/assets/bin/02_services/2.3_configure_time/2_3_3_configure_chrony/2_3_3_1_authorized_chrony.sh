#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is configured with authorized timeserver"

AUTHORIZED_SERVERS=("time.nist.gov" "time-a-g.nist.gov" "time-b-g.nist.gov" "time-c-g.nist.gov") 
CHRONY_CONFIG="/etc/chrony/chrony.conf"
CHRONY_SOURCES_DIR="/etc/chrony/sources.d"
CHRONY_SOURCES_FILE="$CHRONY_SOURCES_DIR/authorized_timeservers.sources"

# Check if systemd-timesyncd was configure
if systemctl is-active --quiet systemd-timesyncd && systemctl is-enabled --quiet systemd-timesyncd; then
    echo "Check status: Pass - systemd-timesyncd is active and enabled. Skipping Chrony configuration."
    exit 0
fi

function check {
    STATUS="Pass"
    SERVER_FOUND=false
    POOL_FOUND=false

    for server in "${AUTHORIZED_SERVERS[@]}"; do
        if grep -qE "^\s*(server|pool)\s+${server}\s+" $CHRONY_CONFIG $CHRONY_SOURCES_DIR/*.sources 2>/dev/null; then
            SERVER_FOUND=true
        else
            POOL_FOUND=true
        fi
    done

    if [ "$SERVER_FOUND" = false ] && [ "$POOL_FOUND" = false ]; then
        STATUS="Fail"
    fi

    echo "Check status: $STATUS"
}

function fix {
    mkdir -p $CHRONY_SOURCES_DIR
    {
        for server in "${AUTHORIZED_SERVERS[@]}"; do
            echo "server $server iburst"
        done
    } > $CHRONY_SOURCES_FILE

    systemctl restart chronyd
}