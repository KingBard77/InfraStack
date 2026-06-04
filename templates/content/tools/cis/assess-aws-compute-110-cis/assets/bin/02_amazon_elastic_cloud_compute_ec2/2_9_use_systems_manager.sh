#!/bin/bash

CRITICALITY=2
TITLE='Ensure use of AWS Systems Manager to manage EC2 instances'

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

    INSTANCE_IDS="$(aws ec2 describe-instances --query 'Reservations[].Instances[?State.Name!=`terminated`].InstanceId' --output text 2>/dev/null)"
    SSM_IDS="$(aws ssm describe-instance-information --query 'InstanceInformationList[].InstanceId' --output text 2>/dev/null)"
    FAILED=""

    for INSTANCE_ID in $INSTANCE_IDS; do
        if ! printf '%s\n' "$SSM_IDS" | tr '\t' '\n' | grep -qx "$INSTANCE_ID"; then
            FAILED="${FAILED} $INSTANCE_ID"
        fi
    done

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: EC2 instances not managed by Systems Manager:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
