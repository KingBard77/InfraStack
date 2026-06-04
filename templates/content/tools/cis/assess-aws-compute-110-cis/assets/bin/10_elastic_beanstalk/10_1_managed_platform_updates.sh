#!/bin/bash

CRITICALITY=1
TITLE='Ensure Managed Platform updates is configured'

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
    for ENV in $(aws elasticbeanstalk describe-environments --query 'Environments[].EnvironmentName' --output text 2>/dev/null); do
        ENABLED="$(aws elasticbeanstalk describe-configuration-settings --environment-name "$ENV" --query 'ConfigurationSettings[].OptionSettings[?Namespace==`aws:elasticbeanstalk:managedactions` && OptionName==`ManagedActionsEnabled`].Value' --output text 2>/dev/null)"
        if [[ "$ENABLED" != "true" ]]; then
            FAILED="${FAILED} $ENV"
        fi
    done

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: Elastic Beanstalk environments without managed platform updates:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
