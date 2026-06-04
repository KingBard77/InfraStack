#!/bin/bash

CRITICALITY=1
TITLE='Ensure Cloudwatch Lambda insights is enabled'

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

    FAILED="$(aws lambda list-functions --query 'Functions[?!Layers || !contains(join(` `, Layers[].Arn), `LambdaInsightsExtension`)].FunctionName' --output text 2>/dev/null)"

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: Lambda functions without Lambda Insights layer found: $FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
