#!/bin/bash

CRITICALITY=1
TITLE='Ensure every Lambda function has its own IAM Role'

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

    DUPLICATE_ROLES="$(aws lambda list-functions --query 'Functions[].Role' --output text 2>/dev/null | tr '\t' '\n' | sort | uniq -d)"

    if [[ -n "$DUPLICATE_ROLES" ]]; then
        STATUS="Fail: Lambda execution roles are shared: $DUPLICATE_ROLES"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
