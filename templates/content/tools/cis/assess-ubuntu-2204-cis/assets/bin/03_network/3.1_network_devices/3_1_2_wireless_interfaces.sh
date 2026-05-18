#!/bin/bash

CRITICALITY=1
TITLE="Ensure wireless interfaces are disabled"

function check {
    STATUS="Pass"

    WIRELESS_INTERFACES=$(find /sys/class/net/*/ -type d -name wireless)
    
    if [ -n "$WIRELESS_INTERFACES" ]; then
        for driverdir in $(echo "$WIRELESS_INTERFACES" | xargs -0 dirname); do
            module_name=$(basename "$(readlink -f "$driverdir"/device/driver/module)")
            
            if lsmod | grep -q "$module_name"; then
                STATUS="Fail: $module_name is loaded"
                echo " - $module_name module is loaded"
            elif ! modprobe -n -v "$module_name" | grep -Pq '^\s*install\s+/bin/(true|false)'; then
                STATUS="Fail: $module_name is loadable"
                echo " - $module_name module is loadable"
            elif ! modprobe --showconfig | grep -Pq "^\s*blacklist\s+$module_name\b"; then
                STATUS="Fail: $module_name is not deny listed"
                echo " - $module_name module is not deny listed"
            fi
        done
    else
		echo "Check status: $STATUS"
    fi

}

function fix {
	echo "Manual"
}