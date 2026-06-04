#!/bin/bash

CRITICALITY=1
TITLE='Ensure Lambda functions are not exposed to everyone.'

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
    for FUNCTION_NAME in $(aws lambda list-functions --query 'Functions[].FunctionName' --output text 2>/dev/null); do
        POLICY="$(aws lambda get-policy --function-name "$FUNCTION_NAME" --query 'Policy' --output text 2>/dev/null)"
        [[ -z "$POLICY" ]] && continue
        if printf '%s\n' "$POLICY" | grep -Eq '"Principal"\s*:\s*("\*"|\{[^}]*"AWS"\s*:\s*"\*")'; then
            FAILED="${FAILED} $FUNCTION_NAME"
        fi
    done

    if [[ -n "$FAILED" ]]; then
        STATUS="Fail: publicly exposed Lambda permissions found:$FAILED"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
