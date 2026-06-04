#!/bin/bash

CRITICALITY=1
TITLE="Ensure 'assignPublicIp' is set to 'DISABLED' for Amazon ECS services"
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

    ecs_services_with_query 'services[?networkConfiguration.awsvpcConfiguration.assignPublicIp!=`DISABLED`].serviceName' 'ECS services with public IP assignment enabled'

    echo "Check status: $STATUS"
}

function fix {
    echo 'Automated cloud remediation is intentionally disabled; apply approved AWS changes after reviewing failed resources.'
}
