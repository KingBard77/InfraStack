#!/bin/bash

CRITICALITY=1
TITLE="Ensure systemd-timesyncd configured with authorized timeserver"

function check {
    AUTHORIZED_NTP="time.nist.gov"
    AUTHORIZED_FALLBACK_NTP="time-a-g.nist.gov time-b-g.nist.gov time-c-g.nist.gov"
    STATUS="Pass"
    CONFIG_FILE="/etc/systemd/timesyncd.conf"
    DROPIN_DIR="/etc/systemd/timesyncd.conf.d"
    DROPIN_FILE="$DROPIN_DIR/60-timesyncd.conf"

    NTP=$(grep -E '^\s*NTP\s*=' $CONFIG_FILE $DROPIN_DIR/*.conf 2>/dev/null | awk -F= '{print $2}' | xargs)
    FALLBACK_NTP=$(grep -E '^\s*FallbackNTP\s*=' $CONFIG_FILE $DROPIN_DIR/*.conf 2>/dev/null | awk -F= '{print $2}' | xargs)

    if [[ "$NTP" != "$AUTHORIZED_NTP" ]]; then
        STATUS="Fail"
    fi

    if [[ "$FALLBACK_NTP" != "$AUTHORIZED_FALLBACK_NTP" ]]; then
        STATUS="Fail"
    fi

    echo "Check status: $STATUS"
}

function fix {
    AUTHORIZED_NTP="time.nist.gov"
    AUTHORIZED_FALLBACK_NTP="time-a-g.nist.gov time-b-g.nist.gov time-c-g.nist.gov"
    CONFIG_FILE="/etc/systemd/timesyncd.conf"
    DROPIN_DIR="/etc/systemd/timesyncd.conf.d"
    DROPIN_FILE="$DROPIN_DIR/60-timesyncd.conf"

    mkdir -p $DROPIN_DIR
    {
        echo "[Time]"
        echo "NTP=$AUTHORIZED_NTP"
        echo "FallbackNTP=$AUTHORIZED_FALLBACK_NTP"
    } > $DROPIN_FILE

    systemctl restart systemd-timesyncd.service
}
