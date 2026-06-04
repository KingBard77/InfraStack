#!/bin/bash

CRITICALITY=2
TITLE='Ensure AWS Config is Enabled for Lambda and Serverless'

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

    if ! aws configservice describe-configuration-recorders --query 'ConfigurationRecorders[].name' --output text 2>/dev/null | grep -q .; then
        STATUS="Fail: AWS Config configuration recorder is not configured"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
