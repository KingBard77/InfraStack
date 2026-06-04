#!/bin/bash

CRITICALITY=1
TITLE='Ensure Lambda functions are referencing active execution roles.'

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
    while read -r FUNCTION_NAME ROLE_ARN; do
        [[ -z "$FUNCTION_NAME" || -z "$ROLE_ARN" ]] && continue
        ROLE_NAME="${ROLE_ARN##*/}"
        if ! aws iam get-role --role-name "$ROLE_NAME" > /dev/null 2>&1; then
            FAILED="${FAILED} $FUNCTION_NAME"
        fi
    done < <(aws lambda list-functions --query 'Functions[].[FunctionName,Role]' --output text 2>/dev/null)

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: Lambda functions reference inactive execution roles:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
