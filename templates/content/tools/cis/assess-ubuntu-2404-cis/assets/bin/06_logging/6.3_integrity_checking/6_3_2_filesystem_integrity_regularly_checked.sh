#!/bin/bash

CRITICALITY=1
TITLE="Ensure filesystem integrity is regularly checked"

function check {
    STATUS="Fail"

    if systemctl list-unit-files | awk '$1~/^dailyaidecheck\.(timer|service)$/ && $2=="enabled"' > /dev/null 2>&1; then
        if systemctl is-active dailyaidecheck.timer > /dev/null 2>&1; then
            STATUS="Pass"
        else
            STATUS="Fail: dailyaidecheck.timer is not active"
        fi
    else
        STATUS="Fail: dailyaidecheck.timer or dailyaidecheck.service is not enabled"
    fi

    echo "Check status: $STATUS"
}

function fix {
	systemctl is-active dailyaidecheck.timer
	systemctl unmask dailyaidecheck.timer dailyaidecheck.service
	systemctl --now enable dailyaidecheck.timer
}
