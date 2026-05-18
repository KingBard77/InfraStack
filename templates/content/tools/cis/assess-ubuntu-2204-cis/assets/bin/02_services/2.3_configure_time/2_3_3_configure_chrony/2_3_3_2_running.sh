#!/bin/bash

CRITICALITY=1
TITLE="Ensure chrony is running as user _chrony"

# Check if systemd-timesyncd was configure
if systemctl is-active --quiet systemd-timesyncd && systemctl is-enabled --quiet systemd-timesyncd; then
    echo "Check status: Pass - systemd-timesyncd is active and enabled. Skipping Chrony configuration."
    exit 0
fi

function check {
    STATUS="Pass"

    CHRONY_USER=$(ps -eo user,cmd | grep '[c]hronyd' | awk '{print $1}')
    if [ "$CHRONY_USER" != "_chrony" ]; then
        STATUS="Fail"
        echo "chronyd is running as user $CHRONY_USER instead of _chrony."
    else
        echo "chronyd is running as user _chrony."
    fi

    echo "Check status: $STATUS"
}

function fix {
    CHRONY_CONFIG="/etc/chrony/chrony.conf"
    CHRONY_CONF_DIR="/etc/chrony/conf.d"
    CHRONY_CONF_FILE="$CHRONY_CONF_DIR/user_chrony.conf"

    mkdir -p $CHRONY_CONF_DIR

    if grep -qE '^\s*user\s+_chrony\s*$' $CHRONY_CONFIG; then
        echo "User _chrony is already configured in $CHRONY_CONFIG"
    else
        echo "user _chrony" | tee -a $CHRONY_CONFIG > /dev/null
    fi

    echo "user _chrony" | tee $CHRONY_CONF_FILE > /dev/null

    systemctl restart chronyd
}