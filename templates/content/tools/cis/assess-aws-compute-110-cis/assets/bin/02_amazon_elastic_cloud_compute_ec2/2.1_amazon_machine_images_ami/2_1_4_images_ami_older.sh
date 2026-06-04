#!/bin/bash

CRITICALITY=1
TITLE="Ensure Images (AMI) are not older than 90 days"
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

    CUTOFF="$(date -u -d '90 days ago' +%s)"
    for REGION in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
        aws ec2 describe-images --region "$REGION" --owners self --query 'Images[].{Id:ImageId,Created:CreationDate}' --output text 2>/dev/null | while read -r CREATED IMAGE_ID; do
            [[ -z "$CREATED" || -z "$IMAGE_ID" ]] && continue
            CREATED_EPOCH="$(date -u -d "$CREATED" +%s 2>/dev/null || echo 0)"
            [[ "$CREATED_EPOCH" -lt "$CUTOFF" ]] && echo "$REGION:$IMAGE_ID"
        done | grep -q . && STATUS="Fail: AMIs older than 90 days found in $REGION"
    done

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
