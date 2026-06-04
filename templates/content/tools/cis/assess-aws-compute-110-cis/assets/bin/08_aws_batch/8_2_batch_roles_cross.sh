#!/bin/bash

CRITICALITY=1
TITLE='Ensure Batch roles are configured for cross-service confused deputy prevention'

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
    ROLE_ARNS="$(aws batch describe-compute-environments --query 'computeEnvironments[].serviceRole' --output text 2>/dev/null)"
    for ROLE_ARN in $ROLE_ARNS; do
        ROLE_NAME="${ROLE_ARN##*/}"
        TRUST="$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.AssumeRolePolicyDocument' --output json 2>/dev/null)"
        if ! printf '%s\n' "$TRUST" | grep -Eq 'aws:Source(Account|Arn)'; then
            FAILED="${FAILED} $ROLE_NAME"
        fi
    done

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: Batch roles missing confused-deputy trust conditions:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
