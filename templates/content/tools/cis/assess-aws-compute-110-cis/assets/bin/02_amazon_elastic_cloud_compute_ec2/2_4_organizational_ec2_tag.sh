#!/bin/bash

CRITICALITY=1
TITLE='Ensure an Organizational EC2 Tag Policy has been Created'

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

    if ! aws organizations list-policies --filter TAG_POLICY --query 'Policies[].Id' --output text 2>/dev/null | grep -q .; then
        STATUS="Fail: no organizational EC2 tag policy found"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
