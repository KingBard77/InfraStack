#!/bin/bash

CRITICALITY=1
TITLE="Ensure EBS volume encryption is enabled"
function check {
    STATUS="Fail"
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

    STATUS="Pass"
    ecs_services_with_query() {
        QUERY="$1"
        MESSAGE="$2"
        INCLUDE="${3:-}"
        for CLUSTER in $(aws ecs list-clusters --query 'clusterArns[]' --output text 2>/dev/null); do
            SERVICES="$(aws ecs list-services --cluster "$CLUSTER" --query 'serviceArns[]' --output text 2>/dev/null)"
            [[ -z "$SERVICES" ]] && continue
            if [[ -n "$INCLUDE" ]]; then
                FAILED="$(aws ecs describe-services --cluster "$CLUSTER" --services $SERVICES --include "$INCLUDE" --query "$QUERY" --output text 2>/dev/null)"
            else
                FAILED="$(aws ecs describe-services --cluster "$CLUSTER" --services $SERVICES --query "$QUERY" --output text 2>/dev/null)"
            fi
            [[ -n "$FAILED" ]] && STATUS="Fail: $MESSAGE in $CLUSTER: $FAILED"
        done
    }

    for REGION in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
        FAILED="$(aws ec2 describe-volumes --region "$REGION" --query 'Volumes[?Encrypted==`false`].VolumeId' --output text 2>/dev/null)"
        [[ -n "$FAILED" ]] && STATUS="Fail: unencrypted EBS volumes found in $REGION: $FAILED"
    done

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
