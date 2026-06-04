#!/bin/bash

CRITICALITY=1
TITLE='Ensure Secrets and Sensitive Data are not stored directly in EC2 User Data'

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

    FAILED=""
    for INSTANCE_ID in $(aws ec2 describe-instances --query 'Reservations[].Instances[].InstanceId' --output text 2>/dev/null); do
        USER_DATA="$(aws ec2 describe-instance-attribute --instance-id "$INSTANCE_ID" --attribute userData --query 'UserData.Value' --output text 2>/dev/null)"
        [[ -z "$USER_DATA" || "$USER_DATA" == "None" ]] && continue
        DECODED="$(printf '%s' "$USER_DATA" | base64 --decode 2>/dev/null)"
        if printf '%s\n' "$DECODED" | grep -Eiq '(password|passwd|secret|token|access[_-]?key|private[_-]?key)'; then
            FAILED="${FAILED} $INSTANCE_ID"
        fi
    done

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: possible secrets found in EC2 user data:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
