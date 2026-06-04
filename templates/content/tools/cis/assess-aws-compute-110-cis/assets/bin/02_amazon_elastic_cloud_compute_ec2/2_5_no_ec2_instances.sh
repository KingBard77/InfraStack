#!/bin/bash

CRITICALITY=1
TITLE='Ensure no AWS EC2 Instances are Older than 180 days'

function check {
    STATUS="Pass"
    export AWS_PAGER=""

    if ! command -v aws > /dev/null 2>&1; then
        STATUS="Fail: aws CLI is not installed"
        echo "Check status: $STATUS"
        return
    fi

    if ! aws sts get-caller-identity > /dev/null 2>&1; then
        STATUS="Fail: aws CLI is not authenticated"
        echo "Check status: $STATUS"
        return
    fi

    CUTOFF="$(date -u -d '180 days ago' +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -v-180d +%Y-%m-%dT%H:%M:%SZ)"
    FAILED="$(aws ec2 describe-instances --query "Reservations[].Instances[?LaunchTime<='$CUTOFF'].InstanceId" --output text 2>/dev/null)"

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: EC2 instances older than 180 days found: $FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
