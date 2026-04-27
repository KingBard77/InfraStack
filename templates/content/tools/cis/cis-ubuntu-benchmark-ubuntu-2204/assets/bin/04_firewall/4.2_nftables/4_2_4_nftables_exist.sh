#!/bin/bash

CRITICALITY=1
TITLE="Ensure a nftables table exists"

function check {
    STATUS="Fail"

    if nft list tables | grep -q 'table inet filter'; then
        STATUS="Pass"
    else
        STATUS="Fail: 'inet filter' table does not exist"
    fi

    echo "Check status: $STATUS"
}

function fix {
    echo "Manual"
    echo "nft create table inet <table name>"
    echo "nft create table inet filter"
}

