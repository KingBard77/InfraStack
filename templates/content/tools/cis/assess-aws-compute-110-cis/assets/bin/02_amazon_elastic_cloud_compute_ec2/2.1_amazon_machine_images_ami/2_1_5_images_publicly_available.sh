#!/bin/bash

CRITICALITY=1
TITLE='Ensure Images are not Publicly Available'

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

    FAILED="$(aws ec2 describe-images --owners self --query 'Images[?Public==`true`].ImageId' --output text 2>/dev/null)"

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: public AMIs found: $FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
